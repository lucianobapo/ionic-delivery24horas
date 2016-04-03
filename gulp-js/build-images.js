/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var imagemin = require('gulp-image-optimization');

/* **********************************************************************************
 * Optimize images in 'platforms' folder
 * **********************************************************************************/
gulp.task('build-images', function() {
    gutil.log('build-images STARTED');
    return gulp.src([
            './platforms/android/assets/www/img/*',
            './platforms/ios/www/img/*',
            './platforms/android/res/**/*.png',
            // './platforms/ios/APP_NAME/Resources/*'
        ], { base: './' })
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./'))
        .on('end', function() {
            return gutil.log('build-images DONE');
        });
});