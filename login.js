// this function runs when the login button is clicked
function checkLogin() {
    var enteredUser = document.getElementById("username").value;
    var enteredPass = document.getElementById("password").value;
    var messageBox = document.getElementById("message");

    // check if fields are empty
    if (enteredUser == "" || enteredPass == "") {
        messageBox.innerHTML = "Please fill both fields!";
        return;
    }

    // fetch the xml file
    fetch("users.xml")
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            // convert text to xml using DOMParser
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");

            var users = xmlDoc.getElementsByTagName("user");
            var found = false;

            // loop through all the users
            for (var i = 0; i < users.length; i++) {
                var name = users[i].getElementsByTagName("username")[0].innerHTML;
                var pass = users[i].getElementsByTagName("password")[0].innerHTML;

                if (name == enteredUser && pass == enteredPass) {
                    found = true;
                }
            }

            if (found == true) {
                messageBox.style.color = "green";
                messageBox.innerHTML = "Login successful! Redirecting...";
                // go to portal page (sending username in the url)
                window.location.href = "portal.html?user=" + enteredUser;
            } else {
                messageBox.style.color = "red";
                messageBox.innerHTML = "Wrong username or password!";
            }
        })
        .catch(function(error) {
            messageBox.innerHTML = "Could not load users.xml. Use Live Server or GitHub Pages!";
            console.log(error);
        });
}
