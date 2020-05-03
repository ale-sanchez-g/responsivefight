$( document ).ready(function() {
    localStorage.clear();
    localStorage.setItem("new", true);
    document.getElementById("start").style.display = "none";
    var userName = localStorage.getItem("userName");
    $('#welcome_text').append(`Choose your battle field ${userName}`);
    pingAPI("https://covid19superheroes.herokuapp.com/api/v2/bus");
    pingAPI("https://supervillain.herokuapp.com/v1/user")
});

// Check the button text matches the correct answer
$( "#warrior" ).click(function() {
    let uname = document.getElementById('worrior_username').value || "guest";
    createUser(uname);
    console.log("user '" + uname + "' has been created");
    localStorage.setItem("userName", uname);
    localStorage.setItem("score", 0);

    // Handles obsolete elements
    document.getElementById("warrior").style.display = "none";
    document.getElementById("worrior_username").style.display = "none";
   
    // Show new elements
    document.getElementById("start").innerHTML = `Start your journey ${uname}`;
    document.getElementById("start").style.display = "inline-block";

  });

///TODO:ENABLE BELOW ONCE API's ARE WORKING
function createUser (user_name){
    var jsonBody = {
        username: user_name,
        score: 0
      }
      $.post("https://supervillain.herokuapp.com/v1/user", jsonBody).fail(function (jqXHR, textStatus, err) {
            console.log("API reponse is " + jqXHR.status);
            console.log(textStatus);
            console.log(err);
        });        
};

// DIRECT API call
function pingAPI (uri){
  $.get({
      url: uri,
      success: function(res){
          console.log(res);
      }
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
});  
};