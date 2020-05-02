$( document ).ready(function() {
    var userName = localStorage.getItem("userName");
    $('#welcome_text').append(`Choose your battle field ${userName}`);
});

// On click Start check for input is not null and leave create new username
$( "#start" ).click(function() {
    let uname = document.getElementById('worrior_username').value || "guest";
    let username = document.getElementById('worrior_username');
    //Check the user has entered a 3 char string in the warrior input field and it is not empty ''
    if (uname != '' & username.length > 3) {
        createUser(uname);
        console.log("user '" + uname + "' has been created");
        localStorage.setItem("userName", uname);
        localStorage.setItem("score", 0);
    } else {
        alert("Please input a Warrior Name of at least 3 alphanumeric characters");        
    }    
  });

///TODO:ENABLE BELOW ONCE API's ARE WORKING
function createUser (userName){
    $.ajax({
        url: "/api/createUser?user_name="+userName,
        type: 'GET',
        dataType: 'text' // << data type
        })      
};

