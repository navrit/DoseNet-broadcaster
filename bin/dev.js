#!/bin/node
var path                    = require('path');
var spawn                   = require('child_process').exec;

var server = spawn('nodemon app/index', {
    cwd: path.join(__dirname, '../')
}, function(err) {
    if (err) {
        console.error(err);
    }
}).stdout.on('data', function(data) {
    console.log(data);
});

var webpack = spawn('webpack --progress --colors --watch', {
    cwd: path.join(__dirname, '../')
}, function(err) {
    if (err) {
        console.error(err);
    }
}).stdout.on('data', function(data) {
    console.log(data);
});
