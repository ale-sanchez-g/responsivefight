var app_env = process.env['APP_ENV'];
var apiUrl;

switch (app_env) {
  case "local":
    apiUrl = "http://localhost:3000/";
    console.log("localhost:3000 config");
    break;
  default:
    apiUrl = "https://covid19superheroes.herokuapp.com/";
    console.log("production config");
}

exports.home = function(req, res){
  res.render('home', {api: apiUrl});
};