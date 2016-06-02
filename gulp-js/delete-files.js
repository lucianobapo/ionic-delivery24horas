/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var argv = require('yargs').argv;

var del = require('del');

/* **********************************************************************************
 * Delete unnecessary files from the application
 * **********************************************************************************/
gulp.task('delete-files', function() {

    //if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        //remove unneccesary files
        //gutil.log('delete-files STARTED');
        var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
        gutil.log('delete-files STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+'  Production:'+ argv.production);

        if (argv.production){
            del([
                //'platforms/android/res/values/facebookconnect.xml',
                'platforms/android/assets/_where-is-www.txt'
            ])
                .then(function() {
                    return gutil.log('delete-files DONE');
                });
        }

    //}
});