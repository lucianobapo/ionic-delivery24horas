#!/usr/bin/env node

//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
//

var androidIconSource = "resources/android/icon/";
var androidSplashSource = "resources/android/splash/";
var androidPlatform = "platforms/android/res/";

// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [{
    "srcfile": androidIconSource+"drawable-hdpi-icon.png",
    "destfile": androidPlatform+"drawable-hdpi/icon.png"
}, {
    "srcfile": androidIconSource+"drawable-ldpi-icon.png",
    "destfile": androidPlatform+"drawable-ldpi/icon.png"
}, {
    "srcfile": androidIconSource+"drawable-mdpi-icon.png",
    "destfile": androidPlatform+"drawable-mdpi/icon.png"
}, {
    "srcfile": androidIconSource+"drawable-xhdpi-icon.png",
    "destfile": androidPlatform+"drawable-xhdpi/icon.png"
}, {
    "srcfile": androidIconSource+"drawable-xxhdpi-icon.png",
    "destfile": androidPlatform+"drawable-xxhdpi/icon.png"
}, {
    "srcfile": androidIconSource+"drawable-xxxhdpi-icon.png",
    "destfile": androidPlatform+"drawable-xxxhdpi/icon.png"
}, {
    "srcfile": androidSplashSource+"drawable-land-hdpi-screen.png",
    "destfile": androidPlatform+"drawable-land-hdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-land-ldpi-screen.png",
    "destfile": androidPlatform+"drawable-land-ldpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-land-mdpi-screen.png",
    "destfile": androidPlatform+"drawable-land-mdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-land-xhdpi-screen.png",
    "destfile": androidPlatform+"drawable-land-xhdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-land-xxhdpi-screen.png",
    "destfile": androidPlatform+"drawable-land-xxhdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-land-xxxhdpi-screen.png",
    "destfile": androidPlatform+"drawable-land-xxxhdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-port-hdpi-screen.png",
    "destfile": androidPlatform+"drawable-port-hdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-port-ldpi-screen.png",
    "destfile": androidPlatform+"drawable-port-ldpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-port-mdpi-screen.png",
    "destfile": androidPlatform+"drawable-port-mdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-port-xhdpi-screen.png",
    "destfile": androidPlatform+"drawable-port-xhdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-port-xxhdpi-screen.png",
    "destfile": androidPlatform+"drawable-port-xxhdpi/screen.png"
}, {
    "srcfile": androidSplashSource+"drawable-port-xxxhdpi-screen.png",
    "destfile": androidPlatform+"drawable-port-xxxhdpi/screen.png"
}//, {
//    "config/ios/Resources/icons/icon-72.png": "platforms/ios/YourAppName/Resources/icons/icon-72.png"
//}, {
//    "config/ios/Resources/icons/icon.png": "platforms/ios/YourAppName/Resources/icons/icon.png"
//}, {
//    "config/ios/Resources/icons/icon@2x.png": "platforms/ios/YourAppName/Resources/icons/icon@2x.png"
//}, {
//    "config/ios/Resources/icons/icon-72@2x.png": "platforms/ios/YourAppName/Resources/icons/icon-72@2x.png"
//}, {
//    "config/ios/Resources/splash/Default@2x~iphone.png": "platforms/ios/YourAppName/Resources/splash/Default@2x~iphone.png"
//}, {
//    "config/ios/Resources/splash/Default-568h@2x~iphone.png": "platforms/ios/YourAppName/Resources/splash/Default-568h@2x~iphone.png"
//}, {
//    "config/ios/Resources/splash/Default~iphone.png": "platforms/ios/YourAppName/Resources/splash/Default~iphone.png"
//}, {
//    "config/ios/Resources/splash/Default-Portrait~ipad.png": "platforms/ios/YourAppName/Resources/splash/Default-Portrait~ipad.png"
//}, {
//    "config/ios/Resources/splash/Default-Portrait@2x~ipad.png": "platforms/ios/YourAppName/Resources/splash/Default-Portrait@2x~ipad.png"
//},
];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

console.log('Copying resource files...');

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function() {
        //var val = obj[key];
        var srcfile = path.join(rootdir, obj['srcfile']);
        var destfile = path.join(rootdir, obj['destfile']);
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
    });
});
