'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var express = require('express');
var config = require('./config');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

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
});



// redirect all outher routes to our single page application
app.get('/*', function (req, res) {
    res.render('index.html');
});


http.listen(3000, function() {
    console.log('listening on *:3000');
});