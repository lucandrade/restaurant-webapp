'use strict';

var connect  = require('connect');
var serverStatic = require('serve-static');
var server = connect();
var livereload = require('livereload');
var port = process.env.PORT || 8080;
var production = process.env.PROD || false;
var folder = production ? '/dist' : '/server';

server.use(serverStatic(__dirname + folder));
server.listen(port);
server = livereload.createServer();
server.watch(__dirname + folder);
console.log('The app is running in http://localhost:' + port);
