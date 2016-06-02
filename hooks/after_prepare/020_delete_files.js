#!/usr/bin/env node

var exec = require('child_process').exec,
    child;

console.log('Deleting unnecessary files...');
var gulpCommand = 'gulp delete-files';

if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    gulpCommand = 'gulp delete-files --production';
}

child = exec(gulpCommand,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});