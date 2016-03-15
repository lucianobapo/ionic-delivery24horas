# Aplicativo Delivery 24 horas

[Site do aplicativo](http://ionic.delivery24horas.com)

[Site do GitHub](https://github.com/lucianobapo/ionic-delivery24horas)

[![Latest Stable Version](https://poser.pugx.org/ilhanet/ionic-delivery24horas/v/stable)](https://packagist.org/packages/ilhanet/ionic-delivery24horas) 
[![Total Downloads](https://poser.pugx.org/ilhanet/ionic-delivery24horas/downloads)](https://packagist.org/packages/ilhanet/ionic-delivery24horas) 
[![Latest Unstable Version](https://poser.pugx.org/ilhanet/ionic-delivery24horas/v/unstable)](https://packagist.org/packages/ilhanet/ionic-delivery24horas) 
[![License](https://poser.pugx.org/ilhanet/ionic-delivery24horas/license)](https://packagist.org/packages/ilhanet/ionic-delivery24horas)


### Quick start
There's only a few steps you have to do in order to run the application. It implies you have installed all necessary tools for building Ionic project (android/ios sdk, ionic, cordova, node, git ...) which is not covered in this topic. Also, you have to be in root project directory when executing the following commands.

***Clone git repository***
```javascript
$ git clone https://github.com/lucianobapo/ionic-delivery24horas.git
```

***Install dependencies***
```javascript
$ npm install
$ gulp install
```

*```npm install```* command installs all dependencies listed in *package.json* file, required for runnung Gulp tasks.

*```gulp install```* command installs ionic javascript files and it's dependencies (angular scripts) from repository listed in *bower.json* file. This way we don't have to manually download and include all ionic scripts in the project, but only point to Ionic github repository. Gulp task will take care for the rest.

***Add platform***
```javascript
$ ionic platform add android/ios
```

***Build application***
```javascript
$ ionic build android/ios [--production]
```

*--production* flag means that application will be shipped with minified and uglified javascript/css assets and optimized for production. Unnecessary files will be deleted and excluded from executable file (.apk/.ipa) so the application will be smaller size when uploading on Google play and Apple store. Also, the app version will be automatically increased by one (only the patch number e.g. 0.0.1 --> 0.0.2).

***Run application in emulator***
```javascript
$ ionic emulate android/ios
```

***Run application in browser***
```javascript
$ ionic serve [--nolivereload]
```

*--nolivereload* flag disables browser to be reloaded after every change made in the code. This helps Gulp *watch* task to build and bundle all assets into single file but you'll have to reload browser manually.