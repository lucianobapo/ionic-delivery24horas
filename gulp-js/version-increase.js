/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

var argv = require('yargs').argv;

/* **********************************************************************************
 * Increase version number only if '--production' flag is set
 * **********************************************************************************/
gulp.task('version-increase', ['project-version-increase'], function() {
    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        gutil.log('version-increase STARTED CORDOVA_CMDLINE:'+process.env.CORDOVA_CMDLINE+' Production:'+argv.production);
        var fs = require('fs');
        var file = "config.xml";

        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return gutil.log(err);
            }

            var version = data.match(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i)[2];
            gutil.log(file + 'current minor version number is ',version, " increasing it to ", parseInt(version)+1);
            version++;

            var result = data.replace(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i, '$1' + version + '$3');

            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return gutil.log(err);
            });

            gutil.log('version-increase DONE');
        });
    }
});

/* **********************************************************************************
 * Increase version number only if '--production' flag is set
 * **********************************************************************************/
gulp.task('project-version-increase', function() {
    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        //if (argv.production) {
        gutil.log('project-version-increase STARTED CORDOVA_CMDLINE:'+process.env.CORDOVA_CMDLINE+' Production:'+argv.production);
        var jeditor = require("gulp-json-editor");
        var file = "package.json";
        return gulp.src(file)
            .pipe(jeditor(function(json) {
                var version = json.version.match(/([0-9]+\.[0-9]+\.)([0-9]+)/i)[2];
                gutil.log(file+' current minor version number is ',version, " increasing it to ", parseInt(version)+1);
                version++;
                var result = json.version.replace(/([0-9]+\.[0-9]+\.)([0-9]+)/i, '$1' + version);
                json.version = result;
                return json; // must return JSON object.
            }))
            .pipe(gulp.dest("./"))
            .on('end', function() {
                return gutil.log('project-version-increase DONE');
            });
    }
});