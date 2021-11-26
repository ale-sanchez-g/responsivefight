let request = require('request');
let app_env = process.env['APP_ENV'];
let logic;

switch (app_env) {
    case "local":
      logic = "https://covid19-logic.herokuapp.com/"
      console.log("local hasure 3001");
        break;
    default:
        logic = "https://covid19-logic.herokuapp.com/"
        console.log("covid19 logic config");
}

function setStage (routing, req, res, hasuraKey) {
    var options = {
      'method': 'POST',
      'url': routing + 'v1/graphql',
      'headers': {
        'x-hasura-admin-secret': `${hasuraKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `mutation startJourney { insert_user_stage(objects: { username: "${req.body.username}", stage: "${req.body.stage}"}, on_conflict: {constraint: user_stage_pkey, update_columns: stage}) { affected_rows } }`,
        variables: {}
      })
    };
    request(options, function (error) {
      if (error) throw new Error(error);
      res.sendStatus(201);
    });
}

function getUserStage (routing, req, res, user, hasuraKey) {
  var options = {
    'method': 'POST',
    'url': routing + 'v1/graphql',
    'headers': {
      'x-hasura-admin-secret': `${hasuraKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query userStage { user_stage(where: {username: {_eq: "${user}"}}) { stage } }`,
      variables: {}
    })
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var locals = JSON.parse(response.body);
    res.json(locals.data.user_stage[0]);
  });
}

exports.userStage = function(req, res){
    let hk = process.env['H_KEY'];
    setStage(logic, req, res, hk)
  };

exports.getUserStage = function (req, res){
  var uname = req.body.username || 'guest';
  let hk = process.env['H_KEY'];
  getUserStage(logic, req, res, uname, hk)
};