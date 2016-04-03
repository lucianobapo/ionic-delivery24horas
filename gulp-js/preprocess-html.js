/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var preprocess = require('gulp-preprocess');
var argv = require('yargs').argv;

var paths = {
    html: ['./resources/build/index.html']
};

/* **********************************************************************************
 * Builds html for development/production
 * **********************************************************************************/
gulp.task('preprocess-html', function() {
    gutil.log('preprocess-html STARTED Production:'+ argv.production);
    return gulp.src(paths.html)
        .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development'}}))
        .pipe(gulp.dest('./www/'))
        .on('end', function() {
            return gutil.log('preprocess-html DONE');
        });
});