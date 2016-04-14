/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var paths = {
    //fontsBase: './resources/lib/ionic/fonts',
    fontsFiles: ['./resources/lib/ionic/fonts/*','./resources/lib/font-awesome/fonts/*']
};

/* **********************************************************************************
 * Copy ionic fonts
 * **********************************************************************************/
gulp.task('copy-fonts', function() {
    gutil.log('copy-fonts STARTED');
    return gulp.src(paths.fontsFiles)
        .pipe(gulp.dest('./www/fonts/'))
        .on('end', function() {
            return gutil.log('copy-fonts DONE');
        });
});