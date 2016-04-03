/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

/* **********************************************************************************
 * This task is usually called from a hook to prepare files for facebook
 * **********************************************************************************/
gulp.task('facebook',[
    //'facebook-strings',
    'facebook-manifest'
], function() {
    return gutil.log('facebook DONE');
});

/* **********************************************************************************
 * Insert facebook tag into string file
 * **********************************************************************************/
gulp.task('facebook-strings', function() {
    //console.log(process.env.CORDOVA_CMDLINE);
    //console.log(argv.production);

    gutil.log('facebook-strings STARTED');
    var fs = require('fs');

    var file = "platforms/android/res/values/strings.xml";
    var facebook = '<string name="fb_app_id">1630647053816087</string>';

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return gutil.log(err);
        }
        //var version = data.match(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i)[2];
        var search = data.match(/(<string name=\"fb_app_id\">)([0-9]+)/i);
        if (search===null) {
            //var result = data.replace(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i, '$1' + version + '$3');
            var result = data.replace(/(<resources>)([^<]*)/i, '$1'+ '$2' + facebook + '$2');
            //fs.writeFile(file, result, 'utf8', function (err) {
            //    if (err) return console.log(err);
            //});
        } else gutil.log('facebook-strings already configured');
        gutil.log('facebook-strings DONE');
    });
});

/* **********************************************************************************
 * Insert facebook tag into manifest file
 * **********************************************************************************/
gulp.task('facebook-manifest', function() {
    gutil.log('facebook-manifest STARTED');
    var fs = require('fs');
    var file = "platforms/android/AndroidManifest.xml";
    var facebook = '<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/fb_app_id"/>';
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return gutil.log(err);
        }
        var search = data.match(/(<meta-data android:name=\"com.facebook.sdk.ApplicationId\")/i);
        //console.log(search);
        if (search===null) {
            var result = data.replace(/(<application [^>]* android:label=\"\@string\/app_name\"[^>]*>)([^<]*)/i, '$1'+ '$2' + facebook + '$2');
            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return gutil.log(err);
            });
        } else gutil.log('facebook-manifest already configured');
        gutil.log('facebook-manifest DONE');
    });
});