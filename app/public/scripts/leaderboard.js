// present the modal to user on pageload
$( document ).ready(function() {
    getLeaderboard();    
  });

function getLeaderboard () {
    //Jquery Ajax - Post the Answer
    $.ajax({
        url: "/api/listusers",  
        type: "GET",
        dataType: "json",
        success: function(res){
            var myUsers = res;
            var col = [];
        for (var i = 0; i < myUsers.length; i++) {
            for (var key in myUsers[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // Create a table.
        var table = document.createElement("table");

        // Create table header row using the extracted headers above.
        var tr = table.insertRow(-1);                   // table row.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // table header.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // add json data to the table as rows.
        for (var i = 0; i < myUsers.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myUsers[i][col[j]];
            }
        }

        // Now, add the newly created table with json data, to a container.
        var divShowData = document.getElementById('showData');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);
        }});
    }