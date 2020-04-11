// present the modal to user on pageload
$( document ).ready(function() {
    console.log( "presenting intro modal" );
    $('#staticBackdrop').modal('show');
    // $('.slideImg').animate({right:'0px'},1200);
    // TODO:Enable once API's are enabled
    // getQnAData();    
});

// Start the timer the modal to user on pageload
$( "#start" ).click(function() {
  var progression = 0,
    progress = setInterval(function() 
    {
        // $('#progress .progress-text').text(progression + '%');
        $('#progress .progress-bar').css({'width':progression+'%'});
        if(progression == 100) {
            clearInterval(progress);
            // alert('done');
        } else
            progression += 1;

    }, 1000);
});

//Evaluate the answer and display appropiate modal
function evaluateAnswer(textString){
  //TODO: remove hardcoded correctanswer to submitAnswer() ajax function once API is enabled
  // submitAnswer();
  var correctAnswer = "Correct Api fetched answer text.";
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
// function getQnAData (){
//Jquery Ajax - Fetch the questions
// $.ajax({
//         url: "https://responsivefight.herokuapp.com/api/officeQuestions",
//         type: 'GET',
//         dataType: 'json', // added data type
//         success: function(res) {
//             console.log(res);
  // create an object with the key of the array
//             var json = $.parseJSON(data); 
//             var correctAnswer = json.
//             alert(res);
//         }
//     });
// }

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