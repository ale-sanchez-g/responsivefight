// present the modal to user on pageload
$( document ).ready(function() {
  var userName = localStorage.getItem("userName");
  var n = localStorage.getItem("new");
  if (userName == undefined || n == undefined ) {
    window.location.replace("/");
  }
  console.log( "presenting intro modal" );
  $('#bus_intro_modal').modal('show');
  getQnAData();    
});

// Start the timer the modal to user on pageload
$( "#bus_timer_start" ).click(function() {  
  $('#bus_question_1').focus();
  startProgressBar();
});

// Check the button text matches the correct answer
$( "#bus_answer_1" ).click(function() {
  var buttonText = $('#bus_answer_1').text();
  qevaluateAnswer(buttonText);      
});

$( "#bus_answer_2" ).click(function() {   
  var buttonText2 = $('#bus_answer_2').text();
  qevaluateAnswer(buttonText2);       
});

//TODO:ENABLE BELOW ONCE API's ARE WORKING
function getQnAData (){
  var bus_question   = $("#bus_question_1");
  var bus_answer_one = $("#bus_answer_1");
  var bus_answer_two = $("#bus_answer_2");
  var answer_score = $("#score");

  //Get Bus Question number or set to 0 to pick first questions  
  var i = localStorage.getItem("busNumber");

  if (i == null) {
    i = 0;
    localStorage.setItem("busNumber", 0);
  }

  //Jquery Ajax - Fetch the questions
  $.ajax({
          url: "/api/fetchquestion?btlfld=bus&index=" + i,
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
            var points =  response.score;
            var stage =  response.id;
            var uname = localStorage.getItem("userName");
            localStorage.setItem("points", points);
            localStorage.setItem("stage", stage);
            // if the questions fail to load from the API
            if (answer_one == undefined || answer_two == undefined) {
                answer_one = "Jump up and down like a crazy person!";
            }
            bus_question.append(question);
            bus_answer_one.append(answer_one);
            bus_answer_two.append(answer_two);
            answer_score.append(uname + " you have scored " + points + " points!");
        }
            }).fail(function (jqXHR, textStatus, error) {
              // Handle error here
              bus_question.append("You have completed this battleground");
              bus_answer_one.append("Check your score");
              document.getElementById("bus_answer_1").href = "leaderboard";
              document.getElementById("bus_answer_2_button").style.display = "none";
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

function startProgressBar() {
    var i = 0;
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("bus_bar");
        var width = 1;
        var id = setInterval(frame, 220);
        var ary = ['#4CAF50', '#FFFF00', '#FF0000'];
        function frame() {
          if (width >= 100 || $('#bus_correct_modal').is(':visible')) {
            clearInterval(id);
            i = 0;	
            //reset the colour to default
            document.getElementById("bus_bar").style.background = "#4CAF50";
            //show the modal only if the correct answer modal is not already on screen, 
            if(!$('#bus_correct_modal').is(':visible')){ 
              //hide the incorrect modal if shown on screen
              $('#close_incorrect_modal_btn').click();
              $('#bus_out_of_time_modal').modal('show');
            }            
          }    
          else {      	
            width++;
            elem.style.width = width + "%";   
            switch(elem.style.width) {
                  case "40%":
                document.getElementById("bus_bar").style.background = "#FFFF00";
                break;
                  case "75%":
                document.getElementById("bus_bar").style.background = "#FF0000";
                case "100%":
                document.getElementById("bus_bar").style.width = "0";                
            }        
          }
        }
      }
  }
  
//Checn Question Secure
function qevaluateAnswer (btnText) {
  var stage = localStorage.getItem("stage");
  var uname = localStorage.getItem("userName");
  $.post({
    url: `/api/checkanswer`,
    data: {"stage": stage, "answer": btnText},
    success: function(response){
      // read index for selecting a question and add 1
      var index = localStorage.getItem("busNumber")
      localStorage.setItem("busNumber", (parseInt(index) + 1) );
      if (response.data.questions[0] != undefined ) {
            
        // Capture and set score
        var points = response.data.questions[0].score;
        var start_points = parseInt(localStorage.getItem("score"),10) || 0;
        var score = start_points + points;
        localStorage.setItem("score", score);

        // Present modal
        $('#bus_correct_modal').modal('show');
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
        $('#bus_incorrect_modal').modal('show');
    }
    }
  }).fail(function (jqXHR, textStatus, err) {
      console.log("API reponse is " + jqXHR.status);
      console.log(textStatus);
      console.log(err);
  });
}