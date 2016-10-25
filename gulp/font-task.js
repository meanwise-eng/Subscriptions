var gulp = require('gulp');

var BUILD_PATH = './build/content';
var fontmin = require('gulp-fontmin');

gulp.task('font', ['preTask'], function () {
	return gulp.src(['./public/fonts/**/*'])
		.pipe(fontmin())
		.pipe(gulp.dest(BUILD_PATH + '/fonts'));
});