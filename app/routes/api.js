let request = require('request');
let app_env = process.env['APP_ENV'];
let heroApi, villainApi;

switch (app_env) {
    case "local":
        heroApi = "http://0.0.0.0:3001/api/v2/";
        villainApi = "http://0.0.0.0:3000/";
        console.log("configure local apis on 3000 and 3001");
        break;
    default:
        heroApi = "https://covid19superheroes.herokuapp.com/api/v2/";
        villainApi = "https://supervillain.herokuapp.com/";
        console.log("production config");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

exports.office = function(req, res){
   
    var routing = heroApi + "office";

    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            let locals = JSON.parse(body);
            let size = locals.length;
            let questionPick = getRandomInt(size);
            res.json(locals[questionPick]);
        } else {
            console.log(err);
        }
    })
};

exports.bus = function(req, res){
   
    let routing = heroApi + "bus";

    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            let locals = JSON.parse(body);
            let size = locals.length;
            let questionPick = getRandomInt(size);
            res.json(locals[questionPick]);
        } else {
            console.log(err);
        }    })
};

exports.restaurant = function(req, res){
   
    var routing = heroApi + "restaurant";

    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            let size = locals.length;
            let questionPick = getRandomInt(size);
            res.json(locals[questionPick]);
        } else {
            console.log(err);
        }    })
};

exports.createUser = function(req, res){
    
    // Access the provided 'user_name' query parameters
    let user_name = req.query.user_name;

    var routing = villainApi + "v1/user";
    
    request.post(routing, {
        json: {
          username: user_name,
          score: 0
        }
      }, function(err, response, body) {        
        if (!err && response.statusCode == 201) {
            res.send(`welcome warrior ${user_name}`);
        } else {
            res.send(`welcome back warrior ${user_name}`);
        }
    })
}