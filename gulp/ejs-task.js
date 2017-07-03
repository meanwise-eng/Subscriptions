var gulp = require('gulp');
var ejs = require('gulp-ejs')
var gutil = require('gulp-util')

gulp.task('ejs', ['preTask'], function () {
  return gulp.src('./views/**/*.ejs')
    .pipe(ejs({
        msg: 'Hello Gulp!'
    }).on('error', gutil.log))
    .pipe(gulp.dest('./build/views'));
});