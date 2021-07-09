let request = require('request');
let app_env = process.env['APP_ENV'];
let heroApi;

switch (app_env) {
    case "local":
        heroApi = "http://0.0.0.0:3001/api/v2/";
        console.log("configure local apis on 3000 and 3001");
        break;
    default:
        heroApi = "https://covid19superheroes.herokuapp.com/api/v2/";
        console.log("production config");
}

function getQuestion(routing, req, res, index) {
    
    request.get(routing, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            res.json(locals[index]);
        } else {
            console.log(err);
        }    })
 }

exports.office = function(req, res){
    var index = req.query.index || 0;
    var routing = heroApi + "office";
    getQuestion(routing, req, res, index);
};

exports.restaurant = function(req, res){
    var index = req.query.index || 0;
    var routing = heroApi + "restaurant";
    getQuestion(routing, req, res, index);
};