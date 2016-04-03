/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

/* **********************************************************************************
 * Copy www files to platform assets
 * **********************************************************************************/
gulp.task('copy-www', ['delete-www','default'], function() {
    gutil.log('copy-www STARTED');
    gulp.src('./www/**', {base: './www'})
        .pipe(gulp.dest('./platforms/android/assets/www/'))
        .on('end', function() {
            return gutil.log('copy-www DONE');
        });
});