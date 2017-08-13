var gulp = require('gulp');
var jsonminify = require('gulp-jsonminify');
 
gulp.task('json', ['preTask'], function () {
    return gulp.src(['./views/**/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('./build/views'));
});