var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var preprocess = require('gulp-preprocess');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
//var copy = require('copy');
var imagemin = require('gulp-image-optimization');
var shell = require('gulp-shell');
var argv = require('yargs').argv;

//var watch = require('gulp-watch');

var paths = {
    sass: ['./resources/scss/app.scss'],
    cssDest: './www/css/',
    html: ['./resources/build/index.html'],
    templates: ['./resources/js/**/*.html', './resources/templates/**/*.html'],
    vendor: ['./resources/lib/ionic/js/ionic.bundle.js', './resources/lib/angular-locale-pt-br/angular-locale_pt-br.js'],
    js: ['./resources/js/app.js'],
    toWatch: [
        './resources/scss/app.scss',
        './resources/build/index.html',
        './resources/js/**/*.html',
        './resources/templates/**/*.html',
        './resources/js/app.js',
        './resources/js/config.js',
        './resources/js/*/*.js'
    ],
    jsBundleDest: './www/js/bundles/'
};

//gulp.task('default', ['sass']);
//
//gulp.task('sass', function (done) {
//    gulp.src('./resources/scss/ionic.app.scss')
//        .pipe(sass())
//        .on('error', sass.logError)
//        //.pipe(gulp.dest('./www/css/'))
//        .pipe(minifyCss({
//            keepSpecialComments: 0
//        }))
//        .pipe(rename({extname: '.min.css'}))
//        .pipe(gulp.dest('./www/css/'))
//        .on('end', done);
//});

gulp.task('default', [
    'build-css',
    'copy-fonts',
    'preprocess-js',
    'build-templatecache',
    'build-js',
    'uglify',
    'build-vendor',
    'build-html'
]);

/* **********************************************************************************
 * Watch task. Development only.
 * **********************************************************************************/
gulp.task('watch', function () {
    //gulp.watch(paths.sass, ['sass']);
    gulp.watch([paths.toWatch],
        ['build-css', 'build-templatecache', 'build-html', 'preprocess-js', 'build-js'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });

    //watch(paths.toWatch, {emit: "all"}, function(stream) {
    //    gulp.start('build-css');
    //    gulp.start('build-templatecache');
    //    gulp.start('build-html');
    //    gulp.start('preprocess-js');
    //    gulp.start('build-js');
    //})
    //    .on('change', function(file) {
    //    console.log('File ' + file + ' was changed, running tasks...');
    //});
});

/* **********************************************************************************
 * Preparation tasks. Installs all javascript lib dependencies defined in bower.json
 * **********************************************************************************/
gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});


/* **********************************************************************************
 * Builds scss into css
 * **********************************************************************************/
gulp.task('build-css', function() {
    console.log('build-css STARTED');
    gulp.src(paths.sass)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulpif(argv.production, minifyCss({keepSpecialComments: 0})))
        .pipe(gulpif(argv.production, rename({extname: '.min.css'})))
        .pipe(gulp.dest(paths.cssDest))
        //.pipe(gulp.dest('./www/css/'))
        .on('end', function() {
            console.log('build-css DONE');
        });
});

/* **********************************************************************************
 * Copy ionic fonts
 * **********************************************************************************/
gulp.task('copy-fonts', function() {
    console.log('copy-fonts STARTED');
    gulp.src('./resources/lib/ionic/fonts/*', {base: './resources/lib/ionic/fonts'})
        .pipe(gulp.dest('./www/fonts/'))
        .on('end', function() {
            console.log('copy-fonts DONE');
        });
});

/* **********************************************************************************
 * Copy .apk
 * **********************************************************************************/
gulp.task('copy-apk', function() {
    console.log('copy-apk STARTED');
    gulp.src('./platforms/android/build/outputs/apk/android-debug.apk', {base: './platforms/android/build/outputs/apk'})
        .pipe(gulp.dest('./'))
        .on('end', function() {
            console.log('copy-apk DONE');
        });
});

/* **********************************************************************************
 * Builds all javascript files into one bundle
 * **********************************************************************************/
gulp.task('build-js', function() {
    console.log('build-js STARTED');
    return browserify(paths.js)
        .bundle()
        .pipe(source('app.bundle.js'))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            console.log('build-js DONE');
        });
});

/* **********************************************************************************
 * Uglify already bundled file
 * **********************************************************************************/
gulp.task('uglify', function() {
    if (argv.production) {
        console.log('uglify STARTED');
        return gulp.src(paths.jsBundleDest+'app.bundle.js')
            //.pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(paths.jsBundleDest))
            .on('end', function() {
                console.log('uglify DONE');
            });
    }
});

/* **********************************************************************************
 * Builds html for development/production
 * **********************************************************************************/
gulp.task('build-html', function() {
    console.log('build-html STARTED');
    gulp.src(paths.html)
        .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development'}}))
        .pipe(gulp.dest('./www/'))
        .on('end', function() {
            console.log('build-html DONE');
        });
});

gulp.task('preprocess-js', function() {
    console.log('preprocess-js STARTED');
    gulp.src('./resources/js/config.js')
        .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development'}}))
        .pipe(rename({suffix: '-build'}))
        .pipe(gulp.dest('./resources/js/'))
        .on('end', function() {
            console.log('preprocess-js DONE');
        });
});

/* **********************************************************************************
 * Cache all angular templates to reduce the number of http requests
 * **********************************************************************************/
gulp.task('build-templatecache', function () {
    console.log('build-templatecache STARTED');
    gulp.src(paths.templates)
        .pipe(templateCache())
        .pipe(rename({suffix: '-build'}))
        .pipe(gulp.dest('./resources/js/'))
        .on('end', function() {
            console.log('build-templatecache DONE');
        });
});

/* **********************************************************************************
 * Optimize images in 'platforms' folder
 * **********************************************************************************/
gulp.task('build-images', function() {
    console.log('build-images STARTED');
    return gulp.src([
            './platforms/android/assets/www/img/*',
            './platforms/ios/www/img/*',
            './platforms/android/res/**/*.png',
            // './platforms/ios/APP_NAME/Resources/*'
        ], { base: './' })
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./'))
        .on('end', function() {
            console.log('build-images DONE');
        });
});

/* **********************************************************************************
 * Builds vendor scripts. Same for development and production
 * **********************************************************************************/
gulp.task('build-vendor', function() {
    console.log('build-vendor STARTED');
    return gulp.src(paths.vendor)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.jsBundleDest))
        .on('end', function() {
            console.log('build-vendor DONE');
        });
});

/* **********************************************************************************
 * Delete unnecessary files from the application
 * **********************************************************************************/
gulp.task('delete-files', function() {

    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        //remove unneccesary files
        console.log('delete-files STARTED');
        del([
            'platforms/android/assets/_where-is-www.txt'
        ])
            .then(function() {
                console.log('delete-files DONE');
            });
    }
});

/* **********************************************************************************
 * Copy www files to platform assets
 * **********************************************************************************/
gulp.task('copy-www', function() {

    //remove unneccesary files
    console.log('delete-www STARTED');
    del([
        'platforms/android/assets/www/**',
        '!platforms/android/assets/www',
        '!platforms/android/assets/www/cordova-js-src',
        '!platforms/android/assets/www/cordova-js-src/**',
        '!platforms/android/assets/www/plugins',
        '!platforms/android/assets/www/plugins/**',
        '!platforms/android/assets/www/cordova.js',
        '!platforms/android/assets/www/cordova_plugins.js'
    ])
    .then(function() {
        console.log('delete-www DONE');
    });

    console.log('copy-www STARTED');
    gulp.src('./www/**', {base: './www'})
        .pipe(gulp.dest('./platforms/android/assets/www/'))
        .on('end', function() {
            console.log('copy-www DONE');
        });
});

/* **********************************************************************************
 * Indicate user whether 'DEBUG' or 'RELEASE' build is used
 * **********************************************************************************/
gulp.task('release-detect', function() {
    process.env.target = 'DEBUG';

    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        process.env.target = 'RELEASE';
        console.log('\x1b[41m%s\x1b[0m','\n\tPRODUCTION build is being prepared!!!!\n\t\tThis app will use live data!!!\n');
    }

    //we will prepare only available platforms
    process.env.targetAndroid = false;
    process.env.targetIos     = false;
    //process.env.CORDOVA_PLATFORMS = 'android,ios';

    if (process.env.CORDOVA_PLATFORMS) {
        var platforms = process.env.CORDOVA_PLATFORMS.toLowerCase();
        process.env.targetAndroid = platforms.split(',').indexOf('android') >= 0 ? true : false;
        process.env.targetIos = platforms.split(',').indexOf('ios') >= 0 ? true : false;
    }

    if (process.env.targetAndroid == 'true') { console.error('\n\tAndroid platform detected\n'); }
    if (process.env.targetIos == 'true') { console.error('\n\tIOS platform detected\n'); }
})

/* **********************************************************************************
 * This task is usually called from a hook to prepare files for building
 * **********************************************************************************/
gulp.task('build-prepare',[
    'release-detect',
    'default',
    'build-images',
    'version-increase'
], function() {
    console.log('build-prepare DONE');
});

/* **********************************************************************************
 * Install plugins manually
 * **********************************************************************************/
gulp.task('reinstall-plugins', function() {
    console.log('reinstalling ionic plugins...');
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
        console.log(stdout);
    }

    pluginlist.forEach(function(plug) {
        if ((typeof plug)=='string') exec("ionic plugin add " + plug, puts);
        if ((typeof plug)=='object') exec("ionic plugin add " + plug.plugin+plug.args, puts);
    });
});

/* **********************************************************************************
 * Increase version number only if '--production' flag is set
 * **********************************************************************************/
gulp.task('version-increase', ['project-version-increase'], function() {
    console.log(process.env.CORDOVA_CMDLINE);
    console.log(argv.production);
    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
        console.log('version-increase STARTED');
        var fs = require('fs');

        fs.readFile("config.xml", 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var version = data.match(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i)[2];
            console.log('current minor version number is ',version, " increasing it to ", parseInt(version)+1);
            version++;

            var result = data.replace(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i, '$1' + version + '$3');

            fs.writeFile("config.xml", result, 'utf8', function (err) {
                if (err) return console.log(err);
            });

            console.log('version-increase DONE');
        });
    }
});

/* **********************************************************************************
 * Increase version number only if '--production' flag is set
 * **********************************************************************************/
gulp.task('project-version-increase', function() {
    console.log(process.env.CORDOVA_CMDLINE);
    console.log(argv.production);
    if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    //if (argv.production) {
        console.log('project-version-increase STARTED');
        var fs = require('fs');
        var file = "package.json";

        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            //var version = data.match(/(\"version\" [^"]* \"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i);
            var version = data.match(/(\"version\"[^\"]* \"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i)[2];
            //console.log(version);
            console.log('current minor version number is ',version, " increasing it to ", parseInt(version)+1);
            version++;

            var result = data.replace(/(\"version\"[^\"]* \"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i, '$1' + version + '$3');
            //console.log(result);

            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });

            console.log('project-version-increase DONE');
        });
    }
});

/* **********************************************************************************
 * This task is usually called from a hook to prepare files for facebook
 * **********************************************************************************/
gulp.task('facebook',[
    //'facebook-strings',
    'facebook-manifest'
], function() {
    console.log('facebook DONE');
});

/* **********************************************************************************
 * Insert facebook tag into string file
 * **********************************************************************************/
gulp.task('facebook-strings', function() {
    //console.log(process.env.CORDOVA_CMDLINE);
    //console.log(argv.production);

    console.log('facebook-strings STARTED');
    var fs = require('fs');

    var file = "platforms/android/res/values/strings.xml";
    var facebook = '<string name="fb_app_id">1630647053816087</string>';

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //var version = data.match(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i)[2];
        var search = data.match(/(<string name=\"fb_app_id\">)([0-9]+)/i);
        if (search===null) {
            //var result = data.replace(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i, '$1' + version + '$3');
            var result = data.replace(/(<resources>)([^<]*)/i, '$1'+ '$2' + facebook + '$2');
            //fs.writeFile(file, result, 'utf8', function (err) {
            //    if (err) return console.log(err);
            //});
        } else console.log('facebook-strings already configured');
        console.log('facebook-strings DONE');
    });
});

/* **********************************************************************************
 * Insert facebook tag into manifest file
 * **********************************************************************************/
gulp.task('facebook-manifest', function() {
    console.log('facebook-manifest STARTED');
    var fs = require('fs');
    var file = "platforms/android/AndroidManifest.xml";
    var facebook = '<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/fb_app_id"/>';
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var search = data.match(/(<meta-data android:name=\"com.facebook.sdk.ApplicationId\")/i);
        //console.log(search);
        if (search===null) {
            var result = data.replace(/(<application [^>]* android:label=\"\@string\/app_name\"[^>]*>)([^<]*)/i, '$1'+ '$2' + facebook + '$2');
            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        } else console.log('facebook-manifest already configured');
        console.log('facebook-manifest DONE');
    });
});