/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;

/* **********************************************************************************
 * This task is usually called from a hook to prepare files for facebook
 * **********************************************************************************/
gulp.task('facebook',[
    'facebook-strings-json',
    'facebook-strings-json2',
    'facebook-strings-xml',
    'facebook-manifest'
], function() {
    return gutil.log('facebook DONE');
});

/* **********************************************************************************
 * Insert facebook tag into string file
 * **********************************************************************************/
gulp.task('facebook-strings-json', function() {
    var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
    gutil.log('facebook-strings-json STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+'  Production:'+ argv.production);

    var jeditor = require("gulp-json-editor");
    var file = "plugins/fetch.json";
    return gulp.src(file)
        .pipe(jeditor(function(json) {
            if (argv.production){
                app_id = '1581785262035600';
                app_name = 'Delivery24hs';
            } else {
                app_id = '1630647053816087';
                app_name = 'Delivery24hs local';
            }

            if (app_id!=json['phonegap-facebook-plugin'].variables.APP_ID){
                json['phonegap-facebook-plugin'].variables.APP_ID = app_id;
            } else gutil.log('json id already configured');

            if (app_name!=json['phonegap-facebook-plugin'].variables.APP_NAME){
                json['phonegap-facebook-plugin'].variables.APP_NAME = app_name;
            } else gutil.log('json name already configured');

            return json;
        }))
        .pipe(gulp.dest("./plugins/"))
        .on('end', function() {
            return gutil.log('facebook-strings-json DONE');
        });
});
/* **********************************************************************************
 * Insert facebook tag into string file
 * **********************************************************************************/
gulp.task('facebook-strings-json2', function() {
    var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
    gutil.log('facebook-strings-json2 STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+'  Production:'+ argv.production);

    var jeditor = require("gulp-json-editor");
    var file = "plugins/android.json";
    return gulp.src(file)
        .pipe(jeditor(function(json) {
            if (argv.production){
                app_id = '1581785262035600';
                app_name = 'Delivery24hs';
            } else {
                app_id = '1630647053816087';
                app_name = 'Delivery24hs local';
            }

            if (app_id!=json['installed_plugins']['phonegap-facebook-plugin'].APP_ID){
                json['installed_plugins']['phonegap-facebook-plugin'].APP_ID = app_id;
            } else gutil.log('json id already configured');

            if (app_name!=json['installed_plugins']['phonegap-facebook-plugin'].APP_NAME){
                json['installed_plugins']['phonegap-facebook-plugin'].APP_NAME = app_name;
            } else gutil.log('json name already configured');

            return json;
        }))
        .pipe(gulp.dest("./plugins/"))
        .on('end', function() {
            return gutil.log('facebook-strings-json2 DONE');
        });
});

/* **********************************************************************************
 * Insert facebook tag into string file
 * **********************************************************************************/
gulp.task('facebook-strings-xml', function() {
    var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
    gutil.log('facebook-strings-xml STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+'  Production:'+ argv.production);

    var fs = require('fs');

    var file = "platforms/android/res/values/facebookconnect.xml";
    var app_id;
    var app_name;
    //var resultId;
    if (argv.production){
        app_id = '1581785262035600';
        app_name = 'Delivery24hs';
    } else {
        app_id = '1630647053816087';
        app_name = 'Delivery24hs local';
    }

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return gutil.log(err);
        }

        var facebook = '<string name="fb_app_id">'+app_id+'</string>\n<string name="fb_app_name">'+app_name+'</string>';

        //var searchId = data.match(/(<string name=\"fb_app_id\">)([0-9]+)(<\/resources>)/i);
        var search = data.match(/(<resources>\n)([^!]*)(\n<\/resources>)/i);
        if (search!==null) {
            var result = data.replace(/(<resources>\n)([^!]*)(\n<\/resources>)/i, '$1' + facebook + '$3');

            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        } else gutil.log('xml not match');

        //if (app_id!=searchId[2]){
        //    resultId = data.replace(/(<string name=\"fb_app_id\">)([0-9]+)([^<]*)/i, '$1' + app_id);
        //    //gutil.log(resultId);
        //} else {
        //    resultId = data;
        //    gutil.log('xml id already configured');
        //}

        //var searchName = resultId.match(/(<string name=\"fb_app_name\">)([^<]*)/i);
        //if (app_name!=searchName[2]){
        //    var resultName = resultId.replace(/(<string name=\"fb_app_name\">)([^<]*)/i, '$1' + app_name);
        //    //gutil.log(resultName);
        //    //fs.writeFile(file, resultName, 'utf8', function (err) {
        //    //    if (err) return console.log(err);
        //    //});
        //} else gutil.log('xml name already configured');

        gutil.log('facebook-strings-xml DONE');
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