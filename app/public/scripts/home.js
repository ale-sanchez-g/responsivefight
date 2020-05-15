$( document ).ready(function() {
    localStorage.clear();
    localStorage.setItem("new", true);
    var userName = localStorage.getItem("userName");
    $('#welcome_text').append(`Choose your battle field ${userName}`);
    // Wake up required APIs
    pingAPI("https://covid19superheroes.herokuapp.com/api/v2/bus");
    pingAPI("https://supervillain.herokuapp.com/v1/user");
    getFlow();
});

// Check the button text matches the correct answer
$( "#warrior" ).click(function() {
    let uname = document.getElementById('worrior_username').value || "guest";
    createUser(uname);
    setUserStage(uname);
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

// Set up User journey start point
function setUserStage (user_name) {
    var flow = JSON.parse(localStorage.getItem("flow"));
    var count = Object.keys(flow).length;
    localStorage.setItem("length", count);

    var settings = {
        "url": "https://covid19-logic.herokuapp.com/v1/graphql",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "x-hasura-admin-secret": "lol123lol",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          query: "mutation startJourney { insert_user_stage(objects: { username: \"" + user_name + "\", stage: \"" + flow.stage_1 + "\"}, on_conflict: {constraint: user_stage_pkey, update_columns: stage}) { affected_rows } }" 
        })
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}

// Get flow
function getFlow () {
  var settings = {
      "url": "https://covid19-logic.herokuapp.com/v1/graphql",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "x-hasura-admin-secret": "lol123lol",
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        query: "query getFlow {flows(where: {id: {_eq: \"flow_1\"}}) {flow_sequence}}"
      })
    };
    
    $.ajax(settings).done(function (response) {
      localStorage.setItem("flow", JSON.stringify(response.data.flows[0].flow_sequence));
      localStorage.setItem("position", "stage_1");

    });
}