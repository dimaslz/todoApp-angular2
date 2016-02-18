'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var express = require('express');
var config = require('./config');

var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io').listen(http);

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


// io.on('connection', function(socket) {
//    /*console.log('a user connected'); 
//    socket.on('disconnect', function() {
//       console.log('user disconnect'); 
//    });*/
   
// //    socket.on('chat message', function(msg) {
// //        console.log('message: ' + msg);
// //    });
   
//    socket.on('chat_message', function(msg){
//        console.log('mensajeeeee');
//     io.emit('chat_message', msg);
//   });
// });



// redirect all outher routes to our single page application
app.get('/*', function (req, res) {
    res.render('index.html');
});


// http.listen(3000, function() {
//     console.log('listening on *:3000');
// });

// start server!
app.listen(config.port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('√ Server ready: http://localhost:%s', config.port);
    }
});
