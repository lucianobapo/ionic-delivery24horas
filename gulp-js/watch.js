/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var paths = {
    toWatch: [
        './resources/scss/app.scss',
        './resources/build/index.html',
        './resources/js/**/*.html',
        './resources/templates/**/*.html',
        './resources/js/app.js',
        './resources/js/config.js',
        './resources/js/*/*.js'
    ]
};

/* **********************************************************************************
 * Watch task. Development only.
 * **********************************************************************************/
gulp.task('watch', function () {
    //gulp.watch(paths.sass, ['sass']);
    gutil.log('watch STARTED');
    gulp.watch([paths.toWatch], ['core'])
        .on('change', function(event) {
            //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            return gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
        .on('end', function() {
            return gutil.log('watch END');
        });

    //watch(paths.toWatch, {emit: "all"}, function(stream) {
    //    gulp.start('build-css');
    //    gulp.start('build-templatecache');
    //    gulp.start('build-html');
    //    gulp.start('preprocess-js');
    //    gulp.start('build-js');
    //})
    //    .on('change', function(file) {
    //    console.log('File ' + file + ' was changed, running tasks...');
    //});
});