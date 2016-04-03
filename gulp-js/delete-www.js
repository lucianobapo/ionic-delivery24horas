/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var del = require('del');

/* **********************************************************************************
 * Copy www files to platform assets
 * **********************************************************************************/
gulp.task('delete-www', function() {
    //remove unneccesary files
    gutil.log('delete-www STARTED');
    del([
        'platforms/android/assets/www/**',
        '!platforms/android/assets/www',
        '!platforms/android/assets/www/cordova-js-src',
        '!platforms/android/assets/www/cordova-js-src/**',
        '!platforms/android/assets/www/plugins',
        '!platforms/android/assets/www/plugins/**',
        '!platforms/android/assets/www/cordova.js',
        '!platforms/android/assets/www/cordova_plugins.js'
    ])
        .then(function() {
            return gutil.log('delete-www DONE');
        });

});