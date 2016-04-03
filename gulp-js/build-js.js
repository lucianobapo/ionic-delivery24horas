/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
    js: ['./resources/js/app.js'],
    jsBundleDest: './www/js/bundles/'
};

/* **********************************************************************************
 * Builds all javascript files into one bundle
 * **********************************************************************************/
gulp.task('build-js',['preprocess-js'], function() {
    gutil.log('build-js STARTED');
    return browserify(paths.js)
        .bundle()
        .pipe(source('app.bundle.js'))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            return gutil.log('build-js DONE');
        });
});