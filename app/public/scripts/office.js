// present the modal to user on pageload
$( document ).ready(function() {
  var userName = localStorage.getItem("userName");
  var n = localStorage.getItem("new");
  if (userName == undefined || n == undefined ) {
    window.location.replace("/");
  }
    console.log( "presenting intro modal" );
    $('#staticBackdrop').modal('show');
    // $('.slideImg').animate({right:'0px'},1200);
    // TODO:Enable once API's are enabled
     getQnAData();    
});

// Start the timer the modal to user on pageload
$( "#start" ).click(function() {  
    $('#office_question_1').focus();
    startProgressBar();
});

function startProgressBar() {
    var i = 0;
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 220);
        var ary = ['#4CAF50', '#FFFF00', '#FF0000'];
        function frame() {
          if (width >= 100 || $('#staticBackdrop2').is(':visible')) {
            clearInterval(id);
            i = 0;	
            //reset the colour to default
            document.getElementById("myBar").style.background = "#4CAF50";
            //show the modal only if the correct answer modal is not already on screen, 
            if(!$('#staticBackdrop2').is(':visible')){ 
              //hide the incorrect modal if shown on screen
              $('#close_modal_btn_2').click();
              $('#staticBackdrop4').modal('show');
            }            
          }    
          else {      	
            width++;
            elem.style.width = width + "%";   
            switch(elem.style.width) {
                  case "40%":
                document.getElementById("myBar").style.background = "#FFFF00";
                break;
                  case "75%":
                document.getElementById("myBar").style.background = "#FF0000";
                case "100%":
                document.getElementById("myBar").style.width = "0";                
            }        
          }
        }
      }
    }

//Evaluate the answer and display appropiate modal
function evaluateAnswer(textString){
  //TODO: remove hardcoded correctanswer to submitAnswer() ajax function once API is enabled
  // submitAnswer();
  var correctAnswer = localStorage.getItem("busca");
  //var correctAnswer = "Use your superheroe Social Distance, notify your Manager and maintain a safe distance.";
  //var buttonText = $('#office_answer_1').text();
  if(textString === correctAnswer) {

    // read index for selecting a question and add 1
    var index = localStorage.getItem("officeNumber")
    localStorage.setItem("officeNumber", (parseInt(index) + 1) );

    // Capture and set username and score
    var uname = localStorage.getItem("userName");
    var points = parseInt(localStorage.getItem("points", points),10);
    var start_points = parseInt(localStorage.getItem("score"),10);
    var score = start_points + points;
    localStorage.setItem("score", score);
    
    // Present modal
    $('#staticBackdrop2').modal('show');
    addPoints(uname,score);
    //return user to home page
  } else {
    $('#staticBackdrop3').modal('show');  
    //TODO: return user to screen
  }  
}

// Check the button text matches the correct answer
$( "#office_answer_1" ).click(function() {
  var buttonText = $('#office_answer_1').text();
  evaluateAnswer(buttonText);      
});

$( "#office_answer_2" ).click(function() {   
  var buttonText2 = $('#office_answer_2').text();
  evaluateAnswer(buttonText2);       
});

///TODO:ENABLE BELOW ONCE API's ARE WORKING
function getQnAData (){
var office_question   = $("#office_question_1");
var office_answer_one = $("#office_answer_1");
var office_answer_two = $("#office_answer_2");
var answer_score = $("#score");
var i = localStorage.getItem("officeNumber");

if (i == null) {
  i = 0;
  localStorage.setItem("officeNumber", 0);
}

//Jquery Ajax - Fetch the questions
$.ajax({
        url: "/api/officeQuestions?index=" + i,
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
          office_question.append(question);
          office_answer_one.append(answer_one);
          office_answer_two.append(answer_two);
          answer_score.append(uname + " you have scored " + points + " points!");
      }
          }).fail(function (jqXHR, textStatus, error) {
          // Handle error here
            office_question.append("You have completed this battleground");
            office_answer_one.append("Check your score");
            document.getElementById("office_answer_1").href = "leaderboard";
            document.getElementById("office_answer_2_button").style.display = "none";
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

//Enable this once server side logic does answer checking
// function submitAnswer (answer) {
// //Jquery Ajax - Post the Answer
// var data = [{ "response": answer}]
// $.ajax({
//     url: "https://responsivefight.herokuapp.com/api/officeAnswer",  
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