'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var express = require('express');
var config = require('./config');
var fs = require('fs');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('./public'));
app.use("/scripts", express.static(__dirname + "/node_modules/"));

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
    watch: config.env == 'development'
});


io.on('connection', function(socket) {
    socket.on('reloadList', function(msg){
        io.emit('reloadList', msg);
    });
    
    socket.on('changeRoute', function(msg){
        io.emit('changeRoute', msg);
    });
});

// redirect all outher routes to our single page application
app.get('/*', function (req, res) {
  // if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
  //   fs.readFile("./public"+req.url, function (err, data) {
  //     if (err) console.log(err);
  //     res.writeHead(200, {'Content-Type': 'text/css'});
  //     res.write(data);
  //     res.end();
  //   });

  // }
    res.render('index.html');
});


http.listen(config.port, function() {
    console.log('listening on *:'+config.port);
});