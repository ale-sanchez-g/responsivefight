let express = require('express');
let fs = require('fs');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let home = require('./routes/home');
let questionState = require('./routes/gqlQuestionApi');
let userState = require('./routes/gqlUserApi');
let usrVillan = require('./routes/villanApi');

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

// GraphQL
app.get('/api/getflow', questionState.getFlow);
app.get('/api/fetchquestion', questionState.fetchquestion);
app.post('/api/checkanswer', questionState.checkAnswer);

app.post('/api/userstage', userState.userStage);
app.get('/api/getstage', userState.getUserStage);

// BFF
app.post('/api/adduser', usrVillan.createUsr);
app.put('/api/updateuser', usrVillan.updateUsr);
app.get('/api/listusers', usrVillan.listUsr);

let port =process.env.PORT || 8080;

module.exports = app;

static_html.forEach(function(page){
    app.get(`/${page}`, (req, res) => {
        fs.readFile(__dirname + `/public/${page}.html`, 'utf8', (err, text) => {
            res.send(text);
        });
    });
});

app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('error', { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

let server = app.listen(port, function () {

    var host = "127.0.0.1";
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});