#!/usr/bin/env node

var exec = require('child_process').exec,
    child;

console.log('Copying www files...');

child = exec('gulp copy-www',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});