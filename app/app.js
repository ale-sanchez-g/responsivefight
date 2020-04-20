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
        let myObj = 
        [
            {
            question: 'Marcus, your coworker, is constantly coughing in the office, what do you do?',
            answer1: 'Use your superheroe Social Distance, notify your Manager and maintain a safe distance.',
            answer2: 'Keep it to yourself, do not draw attention, and pretend you did not notice!',
            solution: {
                "correctAnswer": 'User your superheroe "Distance" and keep it to yourself'
                }
            },
            {
                question: 'Mary from HR, send a memo advising she is ill and everyone should reach her via email only, what do you do?',
                answer1: 'Use your superheroe Social Distancing, notify your Manager and recomend to her staying at home.',
                answer2: 'Ignore the risk, email Mary only if neccessary and go on with your own work!',
                solution: {
                    "correctAnswer": 'Use your superheroe Social Distancing, notify your Manager and recomend to her staying at home.'
                }
            },
            {
                question: 'Alex, your Manager, tells you his partner recently came back from overseas recently, and is seen constantly sneezing during the day, what do you do?',
                answer1: 'Comfort your Manager, and assure him it is only natural to have a seasonal cold this time of the year.',
                answer2: 'Use your superheroe Social Distance, advise your Manager of the pertaining risk and maintain a safe distance.',
                solution: {
                    "correctAnswer": 'Use your superheroe Social Distance, advise your Manager of the pertaining risk and maintain a safe distance.'
            }
        }];
        res.writeHead(200, {'Content-Type': 'application/json'});    
        res.end(JSON.stringify(myObj))
    }
    else if(req.url === '/api/busQuestions') 
    {
        let myObj = [{
            question: 'Someone sits next you, and is begining to cough, what do you do?',
            answer1: 'User your superheroes "Slap" and keep it to yourself',
            answer2: 'move to another seat immediately and report it to the driver!',
            solution: {
                "correctAnswer": 'move to another seat immediately and report it to the driver!'
                }
            },
            {
                question: 'A tourist enters the bus stop, and closely approaches you for directions, what do you do?',
                answer1: 'Use your Superhero "Distancing" & Sanitizer, politely point to the driver keep to yourself',
                answer2: 'Shake hands and give the lost passenger directions the driver!',
                solution: {
                    "correctAnswer": 'move to another sit immediately and report it to the driver!'
                }
            },
            {
                question: 'A family of 3 children enters the bus stop, and they all look rather ill, what do you do?',
                answer1: 'Use your superheroes Face Mask, Social Distancing & Sanitizer, and maintain a distance',
                answer2: 'Approach the family, ask them to be responsible and head to the doctor immediately!',
                solution: {
                    "correctAnswer": 'Use your superheroes Face Mask, Social Distancing & Sanitizer, and maintain a distance!'
                }
        }];
        res.writeHead(200, {'Content-Type': 'application/json'});    
        res.end(JSON.stringify(myObj))
    }
    else if(req.url === '/api/restaurantQuestions') 
    {
        let myObj = [{
            question: 'You notice people siting next to each otherin a restaurant, what do you do?',
            answer1: 'User your superheroes "Sanitizer", keep a safe distance and ask them to remain at home',
            answer2: 'move away immediately and report it to the Driver!',
            solution: {
                "correctAnswer": 'move away immediately and report it to the Driver!'
                }
            },
            {
                question: 'You notice one of the waiters serving food is Ill and handling orders at a restaurant, what do you do?',
                answer1: 'Ignore the signs of "Social Waiting", and remain oblivious or the situatione',
                answer2: 'Use reasonable logic, keep distance from the waiter and report it to management!',
                solution: {
                    "correctAnswer": 'Use reasonable logic, keep distance from the waiter and report it to management!'
                    }
            },
            {
                question: 'You notice the people at the bar are re-using shot glasses for a group round of drinks, what do you do?',
                answer1: 'Approach the Group as it seems "Fun", and partake in the social festivities',
                answer2: 'Do not ignore the sign of possible contamination and report it to Management.',
                solution: {
                    "correctAnswer": 'Do not ignore the sign of possible contamination and report it to Management.'
                    }
        }];
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