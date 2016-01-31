var gulp       = require('gulp'),
  util         = require('gulp-util'),
  browserSync  = require('browser-sync'),
  jshint       = require('gulp-jshint'),
  rename       = require('gulp-rename'),
  sass         = require('gulp-ruby-sass'),
  uglify       = require('gulp-uglify'),
  fileinclude  = require('gulp-file-include'),
  notify       = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer'),
  include      = require('gulp-include');

//sass
gulp.task('sass', function() {
  return sass('./scss/stylesheet.scss', { style: 'compact' })
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer('> 5%, last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream({}))
    .pipe(notify({ message: "sass file: <%= file.relative %>"}));
});

//html file include 
gulp.task('fileinclude', function() {
  return gulp.src(['./html/**/*.html', '!./html**/_*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './html/'
    }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream({}))
    .pipe(notify({ message: "html include file: <%= file.relative %>"}));
});

//lint js files
gulp.task('lint', function() {
  return gulp.src(['./js/site.js', './js/components/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: "js lint file: <%= file.relative %>"}));
});

//compile site.js files
gulp.task('include', ['lint'], function() {
  return gulp.src(['./js/site.js'])
    .on('error', function (err) { console.log(err.message); })
    .pipe(include())
    .pipe(rename({suffix: '.inc'}))
    .pipe(gulp.dest('./js'))
    .pipe(notify({ message: "js include file: <%= file.relative %>"}));
});

//min site.js files
gulp.task('min', ['include'], function() {
  return gulp.src(['./js/site.inc.js'])
    .on('error', function (err) { console.log(err.message); })
    .pipe(uglify())
    .pipe(rename({basename: 'site.min'}))
    .pipe(gulp.dest('./js'))
    .pipe(notify({ message: "js min file: <%= file.relative %>"}));
});

//browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: "./",
      index: "html/index.html",
      directory: true
    }
  });
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('html/**/*.html', ['fileinclude']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('js/**/*.js', ['min', browserSync.reload]);
});