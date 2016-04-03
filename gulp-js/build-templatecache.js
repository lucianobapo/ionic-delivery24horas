/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');

var paths = {
    templates: ['./resources/js/**/*.html', './resources/templates/**/*.html'],
    templatesDest: './resources/js/'
};

/* **********************************************************************************
 * Cache all angular templates to reduce the number of http requests
 * **********************************************************************************/
gulp.task('build-templatecache', function () {
    gutil.log('build-templatecache STARTED');
    return gulp.src(paths.templates)
        .pipe(templateCache())
        .pipe(rename({suffix: '-build'}))
        .pipe(gulp.dest(paths.templatesDest))
        .on('end', function() {
            return gutil.log('build-templatecache DONE');
        });
});