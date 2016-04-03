/**
 * Created by luciano on 03/04/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');

/* **********************************************************************************
 * Install plugins manually
 * **********************************************************************************/
gulp.task('reinstall-plugins', function() {
    gutil.log('reinstalling ionic plugins...');
    var pluginlist = [
        "cordova-plugin-device",
        "cordova-plugin-console",
        "cordova-plugin-whitelist",
        "cordova-plugin-splashscreen",
        "cordova-plugin-statusbar",
        "ionic-plugin-keyboard",
        "phonegap-facebook-plugin --variable APP_ID=\"1630647053816087\" --variable APP_NAME=\"Delivery24hs local\""
        //{ plugin: "phonegap-facebook-plugin", args: ' --variable APP_ID="1630647053816087" --variable APP_NAME="Delivery24hs local"'}
    ];

    // no need to configure below
    var fs    = require('fs');
    var path  = require('path');
    var exec  = require('child_process').exec;

    function puts(error, stdout, stderr) {
        gutil.log(stdout);
    }

    pluginlist.forEach(function(plug) {
        if ((typeof plug)=='string') exec("ionic plugin add " + plug, puts);
        if ((typeof plug)=='object') exec("ionic plugin add " + plug.plugin+plug.args, puts);
    });
});