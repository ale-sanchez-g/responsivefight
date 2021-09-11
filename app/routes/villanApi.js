let request = require("request");
let app_env = process.env["APP_ENV"];
let villan;

switch (app_env) {
  case "local":
    villan = "http://0.0.0.0:3000/";
    console.log("local hasure 3000");
    break;
  default:
    villan = "https://supervillain.herokuapp.com/";
    console.log("Villan config");
}

function createUser(routing, payload, tkn, res) {
  var options = {
    method: "POST",
    url: routing + "v1/user",
    headers: {
      Authorization: `${tkn}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var locals = JSON.parse(response.body);
    res.json(locals);
  });
}

function updateUser(routing, payload, tkn, res) {
  var options = {
    method: "PUT",
    url: routing + "v1/user",
    headers: {
      Authorization: `${tkn}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var locals = JSON.parse(response.body);
    res.json(locals);
  });
}

function listUsers(routing, tkn, res) {
  var options = {
    method: "GET",
    url: routing + "v1/user",
    headers: {
      Authorization: `${tkn}`,
      "Content-Type": "application/json",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var locals = JSON.parse(response.body);
    res.json(locals);
  });
}


exports.createUsr = function (req, res) {
  let token = process.env["JWT"];
  createUser(villan, req.body, token, res);
};

exports.updateUsr = function (req, res) {
  let token = process.env["JWT"];
  updateUser(villan, req.body, token, res);
};

exports.listUsr = function (req, res) {
  let token = process.env["JWT"];
  listUsers(villan, token, res);
};