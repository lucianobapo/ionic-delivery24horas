/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var rename = require('gulp-rename');



var paths = {
    sass: ['./resources/scss/app.scss'],
    cssDest: './www/css/'
};

/* **********************************************************************************
 * Builds scss into css
 * **********************************************************************************/
gulp.task('build-css', function() {
    gutil.log('build-css STARTED Production:'+argv.production);
    return gulp.src(paths.sass)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulpif(argv.production, minifyCss({keepSpecialComments: 0})))
        .pipe(gulpif(argv.production, rename({extname: '.min.css'})))
        .pipe(gulp.dest(paths.cssDest))
        .on('end', function() {
            return gutil.log('build-css DONE');
        });
});