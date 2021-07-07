let request = require('request');
let app_env = process.env['APP_ENV'];
let logic;

switch (app_env) {
    case "local":
        logic = "http://0.0.0.0:8080/"
        console.log("local hasure 8080");
        break;
    default:
        logic = "https://covid19-logic.herokuapp.com/"
        console.log("covid19 logic config");
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