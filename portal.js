// show the username from the url
var params = new URLSearchParams(window.location.search);
var loggedUser = params.get("user");
if (loggedUser != null) {
    document.getElementById("welcome-text").innerHTML = "Welcome, " + loggedUser + "!";
}

// this function loads the students from the xml file (AJAX)
function loadStudents() {
    fetch("students.xml")
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");

            var students = xmlDoc.getElementsByTagName("student");
            var tableBody = document.getElementById("table-body");

            var topName = "";
            var topMarks = 0;
            var total = 0;

            for (var i = 0; i < students.length; i++) {
                var name = students[i].getElementsByTagName("name")[0].innerHTML;
                var course = students[i].getElementsByTagName("course")[0].innerHTML;
                var semester = students[i].getElementsByTagName("semester")[0].innerHTML;
                var marks = parseInt(students[i].getElementsByTagName("marks")[0].innerHTML);

                // make a new row
                var row = document.createElement("tr");

                var cell1 = document.createElement("td");
                cell1.innerHTML = name;
                var cell2 = document.createElement("td");
                cell2.innerHTML = course;
                var cell3 = document.createElement("td");
                cell3.innerHTML = semester;
                var cell4 = document.createElement("td");
                cell4.innerHTML = marks;

                // color the marks
                if (marks >= 85) {
                    cell4.style.color = "green";
                } else if (marks < 70) {
                    cell4.style.color = "red";
                }

                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);
                row.appendChild(cell4);
                tableBody.appendChild(row);

                // find the top student
                total = total + marks;
                if (marks > topMarks) {
                    topMarks = marks;
                    topName = name;
                }
            }

            var average = total / students.length;

            document.getElementById("total-students").innerHTML = "Total Students: " + students.length;
            document.getElementById("average-marks").innerHTML = "Average Marks: " + average.toFixed(2);
            document.getElementById("top-student").innerHTML = topName + " (" + topMarks + " marks)";
        })
        .catch(function(error) {
            document.getElementById("total-students").innerHTML = "Error loading students.xml";
            console.log(error);
        });
}

// show / hide the table
function toggleTable() {
    var tableCard = document.getElementById("table-card");
    tableCard.classList.toggle("hidden");
}

// change the heading text
var headingChanged = false;
function changeHeading() {
    var heading = document.getElementById("main-heading");
    if (headingChanged == false) {
        heading.innerHTML = "Welcome to the Student Portal!";
        heading.style.color = "blue";
        headingChanged = true;
    } else {
        heading.innerHTML = "Student Dashboard";
        heading.style.color = "";
        headingChanged = false;
    }
}

// light and dark mode
function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

// call the function when page opens
loadStudents();
