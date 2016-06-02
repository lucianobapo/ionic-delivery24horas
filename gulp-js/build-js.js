/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

//var production = process.env.NODE_ENV === 'production';

var paths = {
    js: './resources/js/app.js',
    //js: ['./resources/js/app.js'],
    jsBundleDest: './www/js/bundles/',
    jsBundleFileDest: 'app.bundle.js'
};

/* **********************************************************************************
 * Builds all javascript files into one bundle
 * **********************************************************************************/
gulp.task('build-js',['build-templatecache','preprocess-js'], function() {
    gutil.log('build-js STARTED');
    return browserify(paths.js)
        .bundle()
        .pipe(source(paths.js))
        .pipe(rename(paths.jsBundleFileDest))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            return gutil.log('build-js DONE');
        });
});