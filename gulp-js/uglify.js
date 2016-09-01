/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

var paths = {
    jsBundle: [
        './www/js/bundles/app.bundle.js'
    ],
    jsBundleDest: './www/js/bundles/'
};

if (argv.production) {
    paths.jsBundle = [
        './www/js/bundles/app.bundle.js',
        './resources/js/googleAnalytics.js',
        './resources/js/facebookPixelCode.js'
    ];
}

/* **********************************************************************************
 * Uglify already bundled file
 * **********************************************************************************/
gulp.task('uglify',['build-js','core'], function() {
    var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
    gutil.log('uglify STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+'  Production:'+ argv.production);
    return gulp.src(paths.jsBundle)
        .pipe(concat('app.bundle.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulpif(argv.production, rename({suffix: '.min'})))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            return gutil.log('uglify DONE');
        });
});