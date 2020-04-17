// present the modal to user on pageload
$( document ).ready(function() {
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
  var correctAnswer = "Use your superheroe Social Distance, notify your Manager and maintain a safe distance.";
  //var buttonText = $('#office_answer_1').text();
  if(textString === correctAnswer) {
    $('#staticBackdrop2').modal('show');
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
//Jquery Ajax - Fetch the questions
$.ajax({
        url: "/api/officeQuestions",
        type: 'GET',
        //By using datatype we set what we receive and parse the response as a Json object to save us using something like 
        //var response = JSON.parse(response); Neat right?
        dataType: 'json', // << data type
        success: function(response) {
          //Log the success on the call
          console.log("Q&A API reponse success");
          //Break the object with the key of the array - in case you need to append extra stuff, etc
            var question = response.question; 
            var answer_one = response.answer1;
            var answer_two = response.answer2;
            var correct_answer = response.solution.correctAnswer;
            //alert(correct_answer);
            office_question.append(question);
            office_answer_one.append(answer_one);
            office_answer_two.append(answer_two);
            //We don't need to replace the entire element with style, just append the value.
            //$('#office_answer_1').replaceWith('<a href="#" class="btn text-wrap" style="position: relative; white-space: inherit; font-size: larger; text-align: center;">'+json.answer1+'</a>');
          }
          }).fail(function (jqXHR, textStatus, error) {
          // Handle error here
            office_question.append("Fail to receive API data");
            office_answer_one.append("Fail to receive API data");
            office_answer_two.append("Fail to receive API data");
            console.log("API reponse is " + jqXHR.status);
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