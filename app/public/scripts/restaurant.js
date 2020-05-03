// present the modal to user on pageload
$(document).ready(function () {
    var userName = localStorage.getItem("userName");
    var n = localStorage.getItem("new");
    if (userName == undefined && n == undefined ) {
        window.location.replace("/");
    }
    console.log("presenting intro modal");
    $('#restaurant_intro_modal').modal('show');
    getQnAData();
});

// Start the timer the modal to user on pageload
$("#restaurant_timer_start").click(function () {
    $('#bus_question_1').focus();
    startProgressBar();
});

function startProgressBar() {
    var i = 0;
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("restaurant_bar");
        var width = 1;
        var id = setInterval(frame, 220);
        var ary = ['#4CAF50', '#FFFF00', '#FF0000'];
        function frame() {
            if (width >= 100 || $('#bus_correct_modal').is(':visible')) {
                clearInterval(id);
                i = 0;
                //reset the colour to default
                document.getElementById("restaurant_bar").style.background = "#4CAF50";
                //show the modal only if the correct answer modal is not already on screen, 
                if (!$('#restaurant_correct_modal').is(':visible')) {
                    //hide the incorrect modal if shown on screen
                    $('#close_incorrect_modal_btn').click();
                    $('#restaurant_out_of_time_modal').modal('show');
                }
            }
            else {
                width++;
                elem.style.width = width + "%";
                switch (elem.style.width) {
                    case "40%":
                        document.getElementById("restaurant_bar").style.background = "#FFFF00";
                        break;
                    case "75%":
                        document.getElementById("restaurant_bar").style.background = "#FF0000";
                    case "100%":
                        document.getElementById("restaurant_bar").style.width = "0";
                }
            }
        }
    }
}

//Evaluate the answer and display appropiate modal
function evaluateAnswer(textString) {
    //TODO: remove hardcoded correctanswer to submitAnswer() ajax function once API is enabled
    // submitAnswer();
    // var correctAnswer = "Use your Superhero Social distance & Sanitizer, move away, sanitize your hands and keep your distance.";
    var correctAnswer = localStorage.getItem("busca");

    //var buttonText = $('#bus_answer_1').text();
    if (textString === correctAnswer) {
        var uname = localStorage.getItem("userName");
        var points = parseInt(localStorage.getItem("points", points),10);
        var start_points = parseInt(localStorage.getItem("score"),10);
        var score = start_points + points;
        
        localStorage.setItem("score", score);

        $('#restaurant_correct_modal').modal('show');
        addPoints(uname,score);
        //return user to home page
    } else {
        $('#restaurant_incorrect_modal').modal('show');
        //TODO: return user to screen
    }
}

// Check the button text matches the correct answer
$("#restaurant_answer_1").click(function () {
    var buttonText = $('#restaurant_answer_1').text();
    evaluateAnswer(buttonText);
});

$("#restaurant_answer_2").click(function () {
    var buttonText2 = $('#restaurant_answer_2').text();
    evaluateAnswer(buttonText2);
});


//TODO:ENABLE BELOW ONCE API's ARE WORKING
function getQnAData() {
    var restaurant_question = $("#restaurant_question_1");
    var restaurant_answer_one = $("#restaurant_answer_1");
    var restaurant_answer_two = $("#restaurant_answer_2");
    var answer_score = $("#score");

    //Jquery Ajax - Fetch the questions
    $.ajax({
        url: "/api/restaurantQuestions",
        type: 'GET',
        //By using datatype we set what we receive and parse the response as a Json object to save us using something like 
        //var response = JSON.parse(response); Neat right?
        dataType: 'json', // << data type
        success: function (response) {
            //alert(response);
            //Log the success on the call
            console.log("Q&A API reponse success");
            //Break the object with the key of the array - in case you need to append extra stuff, etc
            var question = response.question;
            var answer_one = response.answer1;
            var answer_two = response.answer2;
            var correct_answer = response.solution.correctAnswer;
            var points =  response.solution.score;
            var uname = localStorage.getItem("userName");
            localStorage.setItem("busca", correct_answer);
            localStorage.setItem("points", points);
            // if the questions fail to load from the API
            if (answer_one == undefined || answer_two == undefined) {
                answer_one = "Jump up and down like a crazy person!";
                answer_two = localStorage.getItem("busca");
            }
            restaurant_question.append(question);
            restaurant_answer_one.append(answer_one);
            restaurant_answer_two.append(answer_two);
            answer_score.append(uname + " you have scored " + points + " points!");
        }
    }).fail(function (jqXHR, textStatus, error) {
        // Handle error here
        restaurant_question.append("Failed to receive API data");
        restaurant_answer_one.append("Failed to receive API data");
        restaurant_answer_two.append("Failed to receive API data");
        console.log("API reponse is " + jqXHR.status);
    });
}

  function addPoints (user, points) {
  //Jquery Ajax - Post the Answer
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

  // function submitAnswer (answer) {
  // //Jquery Ajax - Post the Answer
  // var data = [{ "response": answer}]
  // $.ajax({
  //     url: "https://responsivefight.herokuapp.com/api/busAnswer",  
  //     type: "POST",
  //     dataType: "json",
  //     contentType: "application/json; charset=utf-8",    
  //     data: JSON.stringify(data),
  //     success: function(res){
  //       //parse response into json object
  //       var json = $.parseJSON(data);
  //     },
  //     error: function(xhr, ajaxOptions, thrownError) {
  //       //alert the user if something went wrong
  //        alert("Failed to retrieve response data! Message: " + xhr.statusText);
  //     }
  //   });
  // }