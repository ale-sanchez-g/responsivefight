$( document ).ready(function() {
    var userName = localStorage.getItem("userName");
    $('#welcome_text').append(`Choose your battle field ${userName}`);
});

// Check the button text matches the correct answer
$( "#start" ).click(function() {
    let uname = document.getElementById('worrior_username').value || "guest";
    createUser(uname);
    console.log("user '" + uname + "' has been created");
    localStorage.setItem("userName", uname);
    localStorage.setItem("score", 0);
  });

///TODO:ENABLE BELOW ONCE API's ARE WORKING
function createUser (userName){
    $.ajax({
        url: "/api/createUser?user_name="+userName,
        type: 'GET',
        dataType: 'text' // << data type
        })      
};

