'use strict';

var connect  = require('connect');
var serverStatic = require('serve-static');
var server = connect();
var livereload = require('livereload');
var port = process.env.PORT || 8080;

server.use(serverStatic(__dirname + '/server'));
server.listen(port);
server = livereload.createServer();
server.watch(__dirname + "/server");
console.log('The app is running in http://localhost:' + port);
