$( document ).ready(function() {
    localStorage.clear();
    localStorage.setItem("new", true);
    var userName = localStorage.getItem("userName");
    $('#welcome_text').append(`Choose your battle field ${userName}`);
    // Wake up required APIs
    pingAPI("https://supervillain.herokuapp.com/v1/user");
    gqlFlow();

    $("#worrior_username").keyup( function() {

      if($("#worrior_username").val().length>5) {

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
    document.getElementById("popup").style.display = "none";

    // Show new elements
    document.getElementById("start").innerHTML = `Start your journey ${uname}`;
    document.getElementById("start").style.display = "inline-block";

  });

function createUser (user_name){
    var jsonBody = {
        username: user_name,
        score: 0
      }
      $.post("/api/adduser", jsonBody).fail(function (jqXHR, textStatus, err) {
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

$( "#rego" ).click(function() {
    // Show new elements
    document.getElementById("regomodal").style.display = "inline-block";
});

$( "#close" ).click(function() {
    // Show new elements
    document.getElementById("regomodal").style.display = "none";
    document.getElementById("loginmodal").style.display = "none";

});

$( "#login" ).click(function() {
  // Show new elements
  document.getElementById("loginmodal").style.display = "inline-block";
});

//WIP

$( "#signupbtn" ).click(function() {
  // Show new elements
  document.getElementById("regomodal").style.display = "none";
  let uname = document.getElementById('uname').value
  alert(`WIP // Still bulding this feature.`);

  document.getElementById("loginmodal").style.display = "inline-block";
});