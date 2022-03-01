// present the modal to user on pageload
$(document).ready(function () {
  var userName = localStorage.getItem("userName");
  qgetUserStage(userName);
  $("#introModal").modal("show");
});

$("#start").click(function () {
  $("#answer_1").focus();
});

$("#answer_1").click(function () {
  var buttonText = $("#answer_1").text();
  qevaluateAnswer(buttonText);
});

$("#answer_2").click(function () {
  var buttonText = $("#answer_2").text();
  qevaluateAnswer(buttonText);
});

// Continue the journey
$("#continue").click(function () {
  var stage = localStorage.getItem("stage");
  updateUserSatge(stage);
  fetchQuestion(stage);
  document.getElementById("bar").style.visibility = "visible";
});

// Fetch question
function fetchQuestion(stage) {
  if (stage == "undefined") {
    window.location.replace("/leaderboard");
  }
  $.get({
    url: `/api/fetchquestion?btlfld=${stage}`,
    success: function (res) {
      var question = res.question;
      var answer_one = res.answer1;
      var answer_two = res.answer2;
      var img = res.img;

      document.getElementById("question").textContent = question;
      document.getElementById("answer_1").textContent = answer_one;
      document.getElementById("answer_2").textContent = answer_two;
      document.getElementById("dyno_img").src = img;
    },
  });
}

// Get user Stage from GraphQL
function qgetUserStage(user) {
  $.post({
    url: `/api/getstage`,
    data: { username: user },
    success: function (res) {
      localStorage.setItem("stage", res.stage);
      fetchQuestion(res.stage);
    },
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

//Checn Question Secure
function qevaluateAnswer(btnText) {
  var stage = localStorage.getItem("stage");
  var uname = localStorage.getItem("userName");
  $.post({
    url: `/api/checkanswer`,
    data: { stage: stage, answer: btnText },
    success: function (response) {
      if (response.data.questions[0] != undefined) {
        // Capture and set score
        var points = response.data.questions[0].score;
        var start_points = parseInt(localStorage.getItem("score"), 10) || 0;
        var score = start_points + points;
        localStorage.setItem("score", score);

        // Present modal
        $("#correctModal").modal("show");
        addPoints(uname, score);

        // Move to next Stage
        var flow = JSON.parse(localStorage.getItem("flow"));
        var stg = localStorage.getItem("position");
        var arry = stg.split("_");
        var i = arry[1];
        var new_stage = parseInt(i, 10) + 1;

        console.log(new_stage);

        var stage = flow[`stage_${new_stage}`];
        console.log(stage);
        localStorage.setItem("stage", stage);
        localStorage.setItem("position", `stage_${new_stage}`);
      } else {
        // Present modal
        $("#incorrectModal").modal("show");
      }
    },
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

// Push points to Villain Service
function addPoints(user_name, score) {
  var jsonBody = {
    username: user_name,
    score: score,
  };
  $.post("/api/updateuser", jsonBody).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

// Update user stage
function updateUserSatge(stage) {
  var userName = localStorage.getItem("userName");
  var settings = {
    url: "https://covid19-logic.herokuapp.com/v1/graphql",
    method: "POST",
    timeout: 0,
    headers: {
      "x-hasura-admin-secret": "57-Harry-Point",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      query:
        'mutation startJourney { insert_user_stage(objects: { username: "' +
        userName +
        '", stage: "' +
        stage +
        '"}, on_conflict: {constraint: user_stage_pkey, update_columns: stage}) { affected_rows } }',
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
