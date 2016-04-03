/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

/* **********************************************************************************
 * Indicate user whether 'DEBUG' or 'RELEASE' build is used
 * **********************************************************************************/
gulp.task('release-detect', function() {
    process.env.target = 'DEBUG';

    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        process.env.target = 'RELEASE';
        console.log('\x1b[41m%s\x1b[0m','\n\tPRODUCTION build is being prepared!!!!\n\t\tThis app will use live data!!!\n');
    }

    //we will prepare only available platforms
    process.env.targetAndroid = false;
    process.env.targetIos     = false;
    //process.env.CORDOVA_PLATFORMS = 'android,ios';

    if (process.env.CORDOVA_PLATFORMS) {
        var platforms = process.env.CORDOVA_PLATFORMS.toLowerCase();
        //process.env.targetAndroid = platforms.split(',').indexOf('android') >= 0 ? true : false;
        process.env.targetAndroid = (platforms.split(',').indexOf('android') >= 0);
        process.env.targetIos = (platforms.split(',').indexOf('ios') >= 0);
    }

    if (process.env.targetAndroid == 'true') { console.error('\n\tAndroid platform detected\n'); }
    if (process.env.targetIos == 'true') { console.error('\n\tIOS platform detected\n'); }
});