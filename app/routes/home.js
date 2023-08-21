var app_env = process.env["APP_ENV"];
var apiUrl;

switch (app_env) {
  case "locale2e":
    logic = "https://dbe16ca1-23df-4082-83a7-a6948de7fd87.mock.pstmn.io/";
    console.log("postman mock hasura");
    break;
  default:
    apiUrl = "https://covid19superheroes.herokuapp.com/";
    console.log("production config");
}

exports.home = function (req, res) {
  res.render("home", { api: apiUrl });
};
