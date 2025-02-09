/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var paths = {
    apkBase: './platforms/android/build/outputs/apk',
    //apkFiles: ['./platforms/android/build/outputs/apk/android-release.apk', './platforms/android/build/outputs/apk/android-debug.apk']
    apkFiles: './platforms/android/build/outputs/apk/android-release.apk'
};

/* **********************************************************************************
 * Copy .apk
 * **********************************************************************************/
gulp.task('copy-apk', function() {
    gutil.log('copy-apk STARTED');
    return gulp.src(paths.apkFiles, {base: paths.apkBase})
        .pipe(gulp.dest('./'))
        .on('end', function() {
            return gutil.log('copy-apk DONE');
        });
});