#!/usr/bin/env node

var exec = require('child_process').exec,
    child;

console.log('Copying www files...');

var gulpCommand = 'gulp copy-www';

if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    gulpCommand = 'gulp copy-www --production';
}

child = exec(gulpCommand,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});