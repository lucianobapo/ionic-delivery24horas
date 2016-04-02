#!/usr/bin/env node

var exec = require('child_process').exec,
    child;

console.log('Copying facebook files...');

child = exec('gulp facebook',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});