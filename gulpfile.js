var gulp         = require('gulp'),
    util         = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    jshint       = require('gulp-jshint'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync');

// html
gulp.task('html', function() {
  return gulp.src('./src/html/**/*.html')
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./dist/html'))
    .pipe(browserSync.reload({stream:true}));
});

// sass
gulp.task('sass', function() {
  return sass('./src/scss/stylesheet.scss', { style: 'compact' })
    .on('error', function (err) { console.log(err.message); })
    .pipe(autoprefixer({
          browsers: ['> 5%', 'last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'],
        }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

// js
gulp.task('js', function() {
  var js = gulp.src('./src/js/site.js')
    .on('error', function (err) { console.log(err.message); })
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({basename: 'site.min'}))
    .pipe(gulp.dest('./dist/js'));
  var vendor = gulp.src('./src/vendor/**/*.*')
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./dist/vendor'));
  return js, vendor;
});

// static server
gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        notify: false,
        startPath: 'dist/html/index.html',
        server: {
            baseDir: "./",
            directory: true
        }
    });
});

// default task
gulp.task('default', ['browser-sync'], function() {
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js'], browserSync.reload);
});


