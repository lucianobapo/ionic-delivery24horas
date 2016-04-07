/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

var paths = {
    vendor: [
        //'./resources/lib/jquery/dist/jquery.js',
        //'./resources/lib/jquery-ui/jquery-ui.js',
        './resources/lib/ionic/js/ionic.bundle.js',
        //'./resources/lib/angular/angular.js',
        //'./resources/lib/ionic/js/ionic.js',
        //'./resources/lib/ionic/js/ionic-angular.js',
        //'./resources/lib/angular-locale-pt-br/angular-locale_pt-br.js'
        './resources/lib/angular-locale-pt-br/angular-locale_pt-br.js'
    ],
    jsBundleDest: './www/js/bundles/'
};

/* **********************************************************************************
 * Builds vendor scripts. Same for development and production
 * **********************************************************************************/
gulp.task('build-vendor', function() {
    gutil.log('build-vendor STARTED Production:'+argv.production);
    return gulp.src(paths.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulpif(argv.production, rename({suffix: '.min'})))
        //.pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            return gutil.log('build-vendor DONE');
        });
});