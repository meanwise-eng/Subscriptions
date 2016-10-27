var gulp = require('gulp');

var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var BUILD_PATH = './build/content';
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var myConfig = require('../config');
var DEV_MODE = myConfig.isDevMode();

gulp.task('js', ['preTask'], function() {
  return gulp.src([
    './public/js/jquery-2.1.1.js', 
    './public/js/mordernizr.js', 
    './public/js/animatedModal.min.js', 
    './public/js/main.js'])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulpif(DEV_MODE, sourcemaps.write('./maps')))
    .on('error', gutil.log)
    .pipe(gulp.dest(BUILD_PATH + '/js'));
});

gulp.task('js.watch', ['js'], function () {
  gulp.watch('./public/js/*', ['js'])
    .on('change', function(event) {
      gutil.log(event.path + ' changed, running js task...');
    });
  gutil.log('Starting watching js files...');
});