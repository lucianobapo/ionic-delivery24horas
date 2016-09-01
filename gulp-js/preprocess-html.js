/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var preprocess = require('gulp-preprocess');
var argv = require('yargs').argv;

var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');

var paths = {
    html: ['./resources/build/index.html']
};

/* **********************************************************************************
 * Builds html for development/production
 * **********************************************************************************/
gulp.task('preprocess-html', function() {
    var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
    gutil.log('preprocess-html STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+' Production:'+ argv.production);
    return gulp.src(paths.html)
        .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development', CORDOVA:(cordova!=undefined)}}))
        .pipe(gulpif(argv.production, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./www/'))
        .on('end', function() {
            return gutil.log('preprocess-html DONE');
        });
});