var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var home = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', home.home);

var port =process.env.PORT || 8080;

app.listen(port);

module.exports = app;

//create a server route to serve each individual html file and Json response
var server = http.createServer(function(req,res){
    console.log('request was made: ' + req.url);
    if(req.url === '/covid'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/covid.html').pipe(res);
    }
    else if(req.url === '/office'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/office.html').pipe(res);
    } 
    else if(req.url === '/bus'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/bus.html').pipe(res);
    }
    else if(req.url === '/restaurant'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/restaurant.html').pipe(res);
    }
    else if(req.url === '/api/officeQuestions') 
    {
        var myObj = {
            question: 'Someone looks ill, what do you do?',
            answer1: 'User your superheroe "Distance" and keep it to yourself',
            answer2: 'run the other way and scream in panic!',
            solution: {
                "correctAnswer": 'User your superheroe "Distance" and keep it to yourself'
            }            
        };
        res.writeHead(200, {'Content-Type': 'application/json'});    
        res.end(JSON.stringify(myObj))
    }
    else if(req.url === '/api/busQuestions') 
    {
        var myObj = {
            question: 'Someone sits next you, and is begining to cough, what do you do?',
            answer1: 'User your superheroes "Punch" and keep it to yourself',
            answer2: 'move to another sit immediately and report it to the driver!',
            solution: {
                "correctAnswer": 'move to another sit immediately and report it to the driver!'
            }
        };
        res.writeHead(200, {'Content-Type': 'application/json'});    
        res.end(JSON.stringify(myObj))
    }
    else if(req.url === '/api/restaurantQuestions') 
    {
        var myObj = {
            question: 'You notice people siting next to each otherin a restaurant, what do you do?',
            answer1: 'User your superheroes "Sanitizer", keep a safe distance and ask them to remain at home',
            answer2: 'move away immediately and report it to the police!',
            solution: {
                "correctAnswer": 'move to another sit immediately and report it to the driver!'
            }
        };
        res.writeHead(200, {'Content-Type': 'application/json'});    
        res.end(JSON.stringify(myObj))
    }
    else 
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

server.listen(3000, '192.168.0.17');