var request = require('request');
var app_env = process.env['APP_ENV'];
var apiUrl;

switch (app_env) {
    case "local":
        apiUrl = "http://alejandro:3001/";
        console.log("alejandro:3001 config");
        break;
    default:
        apiUrl = "https://covid19superheroes.herokuapp.com/";
        console.log("production config");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

exports.office = function(req, res){
   
    var routing = apiUrl + "office";
    console.log(routing);

    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            res.json(locals);
        }
    })
};

exports.bus = function(req, res){
   
    let routing = apiUrl + "bus";
    console.log(routing);
    let questionPick = getRandomInt(3);

    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            res.send(locals[questionPick]);
        }
    })
};

exports.restaurant = function(req, res){
   
    var routing = apiUrl + "restaurant";
    console.log(routing);    
    //let questionPick = getRandomInt(3);

    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            //res.send(locals[questionPick]);
            res.send(locals);
        }
    })
};