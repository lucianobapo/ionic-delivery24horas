/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var paths = {
    vendor: ['./resources/lib/ionic/js/ionic.bundle.js', './resources/lib/angular-locale-pt-br/angular-locale_pt-br.js'],
    jsBundleDest: './www/js/bundles/'
};

/* **********************************************************************************
 * Builds vendor scripts. Same for development and production
 * **********************************************************************************/
gulp.task('build-vendor', function() {
    gutil.log('build-vendor STARTED');
    return gulp.src(paths.vendor)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            return gutil.log('build-vendor DONE');
        });
});