let request = require("request");
let app_env = process.env["APP_ENV"];
let villan;

switch (app_env) {
  case "locale2e":
    villan = "http://localhost:3000/";
    console.log("Local villan");
    break;
  case "local":
    villan = "https://449e9dd6-4fc4-48fe-9c57-96febcea4993.mock.pstmn.io/";
    console.log("Postman Mock");
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
  console.log(payload);
  var options = {
    method: "PUT",
    url: routing + "v1/user",
    headers: {
      Authorization: `${tkn}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  request(options, function (error) {
    if (error) throw new Error(error);
    res.status(200).send("User updated");
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

function registerUser(routing, payload, tkn, res) {
  if (payload.username === undefined || payload.password === undefined) {
    res.status(400).send({"error": "ERROR400 - Bad Request"});
  } else {
    var options = {
      method: "POST",
      url: routing + "auth/user/register",
      headers: {
        Authorization: `${tkn}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      if (response.statusCode === 200) {
        res.status(200).send("User created");
      } else {
        var bodyResponse = JSON.parse(response.body);
        res.status(400).send(bodyResponse); //Need to update response from villan service
      }
    });
  }
}

function loginUsr(routing, payload, tkn, res) {
  if (payload.username === undefined || payload.password === undefined) {
    res.status(400).send({"error": "ERROR400 - Bad Request"});
  } else {
    var options = {
      method: "POST",
      url: routing + "auth/user/login",
      headers: {
        Authorization: `${tkn}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      if (response.statusCode === 200) {
        res.status(200).send("User logged in");
      } else {
        var bodyResponse = JSON.parse(response.body);
        res.status(400).send(bodyResponse); //Need to update response from villan service
      }
    });
  }
}

exports.registerUsr = function (req, res) {
  let token = process.env["JWT"];
  //req.body {"username": "xxx", "password": "xxx"}
  registerUser(villan, req.body, token, res);
};

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

exports.loginUsr = function (req, res) {
  let token = process.env["JWT"];
  loginUsr(villan, req.body, token, res);
}