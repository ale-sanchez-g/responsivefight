$( document ).ready(function() {
    localStorage.clear();
    localStorage.setItem("new", true);
    var userName = localStorage.getItem("userName");
    $('#welcome_text').append(`Choose your battle field ${userName}`);
    // Wake up required APIs
    pingAPI("https://covid19superheroes.herokuapp.com/api/v2/bus");
    pingAPI("https://supervillain.herokuapp.com/v1/user");
    gqlFlow();

    $("#worrior_username").keyup( function() {

      if($("#worrior_username").val().length>5 && $("#worrior_username").val().length<10) {

          $("#popup").fadeIn();
          $("#popup").html("Only use 10 characters");

      }
      else {

          $("#popup").fadeOut();

      }

  });
});

// Check the button text matches the correct answer
$( "#warrior" ).click(function() {
    let uname = document.getElementById('worrior_username').value || "guest";
    createUser(uname);
    gqluserStage(uname);
    
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

//--- BFF calls below ---//

function gqlFlow (){
  $.get({
      url: "/api/getflow",
      success: function(res){
          localStorage.setItem("flow", JSON.stringify(res));
          localStorage.setItem("position", "stage_1");
      }
    }).fail(function (jqXHR, textStatus, err) {
        console.log("API reponse is " + jqXHR.status);
        console.log(textStatus);
        console.log(err);
    });  
};

function gqluserStage (user_name) {
  var flow = JSON.parse(localStorage.getItem("flow"));
  var jsonBody = {
    username: user_name,
    stage: flow.stage_1
  }
  $.post({
    url: "/api/userstage",
    data: jsonBody,
    success: function(res){
      console.log(res);
    }
  }).fail(function (jqXHR, textStatus, err) {
      console.log("API reponse is " + jqXHR.status);
      console.log(textStatus);
      console.log(err);
  }); 
}