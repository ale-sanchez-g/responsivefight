const apiKey = process.env.hasurasec

// present the modal to user on pageload
$( document ).ready(function() {
    var userName = localStorage.getItem("userName");
    getUserStage(userName);
    $('#introModal').modal('show');
    startProgressBar();  
});

// Start the timer the modal to user on pageload
$("#answer_1").click(function () {
    var buttonText = $('#answer_1').text();
    evaluateAnswer(buttonText);
});

// Start the timer the modal to user on pageload
$("#answer_2").click(function () {
    var buttonText = $('#answer_2').text();
    evaluateAnswer(buttonText);
});

// Continue the journey
$("#continue").click(function () {
  var stage = localStorage.getItem("stage");            
    updateUserSatge(stage);
    fetchQuestion(stage);
    document.getElementById("bar").style.visibility = "visible";
    startProgressBar();  
});

// Get user Stage from GraphQL
function getUserStage (user) {
var settings = {
    "url": "https://covid19-logic.herokuapp.com/v1/graphql",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "x-hasura-admin-secret": \"" + apiKey + "\",
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        query: "query userStage { user_stage(where: {username: {_eq: \"" + user + "\"}}) { stage } }"
    })
    };

$.ajax(settings).done(function (response) {
    var stage = response.data.user_stage[0].stage;
    localStorage.setItem("stage", stage);
    console.log(stage);
    fetchQuestion(stage);
});
}

// Get Question from GraphQL
function fetchQuestion(stage) {
    console.log("getting questions from GraphQL");

    var settings = {
        "url": "https://covid19-logic.herokuapp.com/v1/graphql",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "x-hasura-admin-secret": \"" + apiKey + "\",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          query: "query getQuestion { questions(where: {id: {_eq: \"" + stage + "\"}}) { question answer1 answer2 score } }"
        })
      };

    $.ajax(settings).done(function (response) {
      if ( response.data.questions[0] == undefined ) {
        window.location.replace("/leaderboard");
      } else {
        
        var question =  response.data.questions[0].question;
        var answer_one =  response.data.questions[0].answer1;
        var answer_two =  response.data.questions[0].answer2;

        document.getElementById("question").textContent=question;
        document.getElementById("answer_1").textContent=answer_one;
        document.getElementById("answer_2").textContent=answer_two;

      }

    });
}

// Push points to Villain Service
function addPoints (user, points) {
    //Jquery Ajax - add 
    var data = { username: user, score: points}
    console.log(data);
    $.ajax({
        url: "https://supervillain.herokuapp.com/v1/user",  
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",    
        data: JSON.stringify(data),
        success: function(res){
          //parse response into json object
        },
        error: function(xhr, ajaxOptions, thrownError) {
          //alert the user if something went wrong
           console.log("Failed update user score: " + xhr.statusText);
        }
      });
}

//Evaluate the answer and display appropiate modal using graphQL
function evaluateAnswer(btnText) {
    var stage = localStorage.getItem("stage");
    var uname = localStorage.getItem("userName");
    var settings = {
        "url": "https://covid19-logic.herokuapp.com/v1/graphql",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "x-hasura-admin-secret": \"" + apiKey + "\",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            query: "query checkAnswer { questions(where: {id: {_eq: \"" + stage + "\"}, correctAnswer: {_eq: \"" + btnText + "\"}}) { score } }"
        })
      };

    $.ajax(settings).done(function (response) {
        if (response.data.questions[0] != undefined ) {
            
            // Capture and set score
            var points = response.data.questions[0].score;
            var start_points = parseInt(localStorage.getItem("score"),10) || 0;
            var score = start_points + points;
            localStorage.setItem("score", score);

            // Present modal
            $('#correctModal').modal('show');
            addPoints(uname,score);

            // Move to next Stage
            var flow = JSON.parse(localStorage.getItem("flow"));
            var stg = localStorage.getItem("position")
            var arry = stg.split("_");
            var i = arry[1];
            var new_stage = (parseInt(i, 10) + 1);
            
            console.log(new_stage);

            var stage = flow[`stage_${new_stage}`];
            console.log(stage);
            localStorage.setItem("stage", stage);
            localStorage.setItem("position", `stage_${new_stage}`);            
            
        } else {
            // Present modal
            $('#incorrectModal').modal('show');
        }
    });
}    

// Update user stage
function updateUserSatge(stage) {
  var userName = localStorage.getItem("userName");
  var settings = {
    "url": "https://covid19-logic.herokuapp.com/v1/graphql",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "x-hasura-admin-secret": \"" + apiKey + "\",
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      query: "mutation startJourney { insert_user_stage(objects: { username: \"" + userName + "\", stage: \"" + stage + "\"}, on_conflict: {constraint: user_stage_pkey, update_columns: stage}) { affected_rows } }" 
    })
    };

$.ajax(settings).done(function (response) {
    console.log(response);

});
}

function startProgressBar() {
  var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("bar");
      var width = 1;
      var id = setInterval(frame, 220);
      var ary = ['#4CAF50', '#FFFF00', '#FF0000'];
      function frame() {
        if (width >= 100 || $('#correctModal').is(':visible')) {
          clearInterval(id);
          i = 0;	
          //hide bar
          document.getElementById("bar").style.visibility = "hidden";
          //show the modal only if the correct answer modal is not already on screen, 
          if(!$('#correctModal').is(':visible')){ 
            // Present modal
            $('#incorrectModal').modal('show');
          }            
        }    
        else {      	
          width++;
          elem.style.width = width + "%";   
          switch(elem.style.width) {
                case "40%":
                  document.getElementById("bar").style.background = "#FFFF00";
                  break;
                case "75%":
                  document.getElementById("bar").style.background = "#FF0000";
                  break;
                case "100%":
                  document.getElementById("bar").style.visibility = "hidden";
                  break;                
          }        
        }
      }
    }
  }
