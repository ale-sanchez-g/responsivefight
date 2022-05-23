$( document ).ready(function() {
    var userName = localStorage.getItem("userName");
    var n = localStorage.getItem("new");
    if (userName == undefined || n == undefined ) {
        window.location.replace("/");
    } else {
        $('#welcome_text').append(`Welcome ${userName}`);
    }
});
