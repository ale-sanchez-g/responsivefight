// present the modal to user on pageload
$( document ).ready(function() {
    var userName = localStorage.getItem("userName");
    getUserStage(userName);
    $('#introModal').modal('show');
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

// Get user Stage from GraphQL
function getUserStage (user) {
var settings = {
    "url": "https://covid19-logic.herokuapp.com/v1/graphql",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "x-hasura-admin-secret": "lol123lol",
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

    var d_question = $("#question");
    var d_answer_one = $("#answer_1");
    var d_answer_two = $("#answer_2");

    var settings = {
        "url": "https://covid19-logic.herokuapp.com/v1/graphql",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "x-hasura-admin-secret": "lol123lol",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          query: "query getQuestion { questions(where: {id: {_eq: \"" + stage + "\"}}) { question answer1 answer2 score } }"
        })
      };

    $.ajax(settings).done(function (response) {
        var question =  response.data.questions[0].question;
        var answer_one =  response.data.questions[0].answer1;
        var answer_two =  response.data.questions[0].answer2;
        
        d_question.append(question);
        d_answer_one.append(answer_one);
        d_answer_two.append(answer_two);
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
          "x-hasura-admin-secret": "lol123lol",
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
        } else {
            // Present modal
            $('#incorrectModal').modal('show');
        }
    });
}    