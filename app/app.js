let express = require('express');
let fs = require('fs');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let home = require('./routes/home');
let questions = require('./routes/api');
let questionState = require('./routes/gqlQuestionApi');
let userState = require('./routes/gqlUserApi');


let static_html = [
    "covid",
    "office",
    "bus",
    "restaurant",
    "leaderboard",
    "news"
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
app.get('/api/restaurantQuestions', questions.restaurant);

// GraphQL
app.get('/api/gqloffQ', questionState.gqloffice);
app.get('/api/gqlbusQ', questionState.gqlbus);
app.get('/api/gqlresQ', questionState.gqlrestaurant);
app.get('/api/getflow', questionState.getFlow);
app.post('/api/checkanswer', questionState.checkAnswer);

app.post('/api/userstage', userState.userStage);
app.get('/api/getstage', userState.getUserStage);

let port =process.env.PORT || 8080;

module.exports = app;

static_html.forEach(function(page){
    app.get(`/${page}`, (req, res) => {
        fs.readFile(__dirname + `/public/${page}.html`, 'utf8', (err, text) => {
            res.send(text);
        });
    });
});

app.get('*', function(req, res){
    fs.readFile(__dirname + `/public/404.html`, 'utf8', (err, text) => {
        res.send(text, 404);
    });
});

let server = app.listen(port, function () {

    var host = "127.0.0.1";
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});