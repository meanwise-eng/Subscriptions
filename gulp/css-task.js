var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');

var BUILD_PATH = './build/content';
var myConfig = require('../config');
var DEV_MODE = myConfig.isDevMode();


gulp.task('css', ['preTask'], function () {
  return gulp.src(['public/css/**/*.css'])
    .pipe(gulpif(DEV_MODE, sourcemaps.init()))
    .pipe(cleanCSS())
    .pipe(gulpif(DEV_MODE, sourcemaps.write('./maps')))
    .on('error', gutil.log)
    .pipe(gulp.dest(BUILD_PATH + '/css'));
});

gulp.task('css.watch', ['css'], function () {
  gulp.watch('./public/css/**/*.css', ['css'])
    .on('change', function(event) {
      gutil.log(event.path + ' changed, running css task...');
    });
  gutil.log('Starting watching css files...');
});