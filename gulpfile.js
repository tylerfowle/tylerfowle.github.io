var gulp = require('gulp'),
	browserify = require('browserify'),
	browserSync = require('browser-sync'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	transform = require('vinyl-transform'),
	uglify = require('gulp-uglify'),
	util = require('gulp-util');

gulp.task('sass', function() {
	return gulp.src(['scss/*.scss', '!scss/_*.scss'])
		.pipe(sass({
			style: 'compressed'
		}))
		.on('error', function (err) { console.log(err.message); })
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('lint', function() {
	return gulp.src(['js/*.js', '!js/**/*.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['js/*.js', '!js/**/*.min.js', '!js/**/*.dev.js'])
    .pipe(browserified)
    .pipe(uglify({
    	preserveComments: function (node, comment) {
				return comment.value.charAt(0) === '!';
    	}
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: { baseDir: "./", directory: true }
	});
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch(['js/*.js', '!js/**/*.dev.js'], ['lint', 'browserify', 'dev', browserSync.reload]);
});