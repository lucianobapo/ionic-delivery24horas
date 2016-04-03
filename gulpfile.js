var gulp = require('gulp');
var gutil = require('gulp-util');

//var shell = require('gulp-shell');

require('./gulp-js/watch');
require('./gulp-js/install');
require('./gulp-js/git-check');

require('./gulp-js/preprocess-html');
require('./gulp-js/preprocess-js');

require('./gulp-js/build-css');
require('./gulp-js/build-templatecache');
require('./gulp-js/build-js');

require('./gulp-js/uglify');
require('./gulp-js/build-images');
require('./gulp-js/build-vendor');

require('./gulp-js/copy-fonts');
require('./gulp-js/copy-apk');
require('./gulp-js/release-detect');
require('./gulp-js/version-increase');

// tasks for hooks
require('./gulp-js/delete-www');
require('./gulp-js/copy-www');
require('./gulp-js/facebook');
require('./gulp-js/delete-files');

// manual task
require('./gulp-js/reinstall-plugins');


gulp.task('default', [
    'uglify', // dependency: core
    'copy-fonts',
    'build-vendor'
], function() {
    return gutil.log('default DONE');
});

gulp.task('core', [
    'build-css',
    'build-templatecache',
    'preprocess-html',
    'build-js' // dependency: preprocess-js
], function() {
    return gutil.log('core DONE');
});

/* **********************************************************************************
 * This task is usually called from a hook to prepare files for building
 * **********************************************************************************/
gulp.task('build-prepare',[
    'release-detect',
    //'default',
    'build-images',
    'version-increase' // dependency: project-version-increase
], function() {
    return gutil.log('build-prepare DONE');
});

//gulp.task('sass', function (done) {
//    gulp.src('./resources/scss/ionic.app.scss')
//        .pipe(sass())
//        .on('error', sass.logError)
//        //.pipe(gulp.dest('./www/css/'))
//        .pipe(minifyCss({
//            keepSpecialComments: 0
//        }))
//        .pipe(rename({extname: '.min.css'}))
//        .pipe(gulp.dest('./www/css/'))
//        .on('end', done);
//});