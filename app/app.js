let express = require('express');
let http = require('http');
let fs = require('fs');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let home = require('./routes/home');
let questions = require('./routes/api');

let static_html = [
    "covid",
    "office",
    "bus",
    "restaurant"
]
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.get('/', home.home);
app.get('/api/officeQuestions', questions.office);
app.get('/api/busQuestions', questions.bus);
app.get('/api/restaurantQuestions', questions.restaurant);

let port =process.env.PORT || 8080;
app.listen(port);

module.exports = app;

static_html.forEach(function(page){
    app.get(`/${page}`, (req, res) => {
        fs.readFile(__dirname + `/public/${page}.html`, 'utf8', (err, text) => {
            res.send(text);
        });
    });
});

//create a server route to serve each local API call until we move to use the proper API
let server = http.createServer(function(req,res){
    console.log('request was made: ' + req.url);
    if(req.url === '/api/officeQuestions') 
    {
        let myObj = {
            question: 'Marcus, your coworker, is constantly coughing in the office, what do you do?',
            answer1: 'Use your superheroe Social Distance, notify your Manager and maintain a safe distance.',
            answer2: 'Keep it to yourself, do not draw attention, and pretend you did not notice!',
            solution: {
                "correctAnswer": 'User your superheroe "Distance" and keep it to yourself'
            }            
        };
        res.writeHead(200, {'Content-Type': 'application/json'});    
        res.end(JSON.stringify(myObj))
    }
    else if(req.url === '/api/busQuestions') 
    {
        let myObj = {
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
        let myObj = {
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
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

server.listen(3000);