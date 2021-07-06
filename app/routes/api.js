let request = require('request');
let app_env = process.env['APP_ENV'];
let heroApi, villainApi, logic;

switch (app_env) {
    case "local":
        heroApi = "http://0.0.0.0:3001/api/v2/";
        villainApi = "http://0.0.0.0:3000/";
        logic = "http://0.0.0.0:8080/"
        console.log("configure local apis on 3000 and 3001");
        break;
    default:
        heroApi = "https://covid19superheroes.herokuapp.com/api/v2/";
        villainApi = "https://supervillain.herokuapp.com/";
        logic = "https://covid19-logic.herokuapp.com/"
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

function postQuery (routing, req, res, index, btlfld, hasuraKey) {
    var options = {
        'method': 'POST',
        'url': routing + 'v1/graphql',
        'headers': {
          'x-hasura-admin-secret': `${hasuraKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `query getQuestions {
        questions(where: {id: {_ilike: "${btlfld}%"}}) {
          id
          answer1
          answer2
          question
          score
        }
      }`,
          variables: {}
        })
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        var locals = JSON.parse(response.body);
        res.json(locals.data.questions[index]);
      });
} 

function gqlFlow (routing, req, res, hasuraKey) {
    var options = {
        'method': 'POST',
        'url': routing + 'v1/graphql',
        'headers': {
          'x-hasura-admin-secret': `${hasuraKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `query getFlow {flows(where: {id: {_eq: "flow_1"}}) {flow_sequence}}`,
          variables: {}
        })
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        var locals = JSON.parse(response.body);
        res.json(locals.data.flows[0].flow_sequence);
      });
}
exports.office = function(req, res){
    var index = req.query.index || 0;
    var routing = heroApi + "office";
    getQuestion(routing, req, res, index);
};

exports.bus = function(req, res){
    var index = req.query.index || 0;
    let routing = heroApi + "bus";
    getQuestion(routing, req, res, index);
};

exports.restaurant = function(req, res){
    var index = req.query.index || 0;
    var routing = heroApi + "restaurant";
    getQuestion(routing, req, res, index);
};

exports.gqloffice = function(req, res){
    var index = req.query.index || 0;
    let hk = process.env['H_KEY'];
    postQuery(logic, req, res, index, "off", hk);
};

exports.gqlbus = function(req, res){
    var index = req.query.index || 0;
    let hk = process.env['H_KEY'];
    postQuery(logic, req, res, index, "bus", hk);
};

exports.gqlrestaurant = function(req, res){
    var index = req.query.index || 0;
    let hk = process.env['H_KEY'];
    postQuery(logic, req, res, index, "res", hk);
};

exports.getFlow = function(req, res){
    let hk = process.env['H_KEY'];
    gqlFlow(logic, req, res, hk);
};