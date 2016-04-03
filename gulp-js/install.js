/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var bower = require('bower');

/* **********************************************************************************
 * Preparation tasks. Installs all javascript lib dependencies defined in bower.json
 * **********************************************************************************/
gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});