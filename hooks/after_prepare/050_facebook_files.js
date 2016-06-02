#!/usr/bin/env node

var exec = require('child_process').exec,
    child;

console.log('Copying facebook files...');
var gulpCommand = 'gulp facebook';

if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    gulpCommand = 'gulp facebook --production';
}

child = exec(gulpCommand,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});