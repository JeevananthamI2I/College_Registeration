async function getData() {
  const response = await fetch("http://localhost:8080/college/");
  const data = await response.json();
  collegeLists =
    "<div class='content'><table class='table'><tr><th>Name</th><th>University</th><th>Rank</th>";
  collegeLists +=
    "<th>Date</th><th>Place</th><th>Type</th><th>Code</th><th>Options</th></tr>";
  data.forEach((college) => {
    collegeLists += "<tr><td>" + college.name + "</td>";
    collegeLists += "<td>" + college.university + "</td>";
    collegeLists += "<td>" + college.rank + "</td>";
    collegeLists += "<td>" + college.inaugurationDate + "</td>";
    collegeLists += "<td>" + college.place + "</td>";
    collegeLists += "<td>" + college.type + "</td>";
    collegeLists += "<td>" + college.code + "</td>";
    collegeLists +=
      "<td><button type='button'class='college edit' id='edit' onclick=''>Edit</button>&nbsp";
    collegeLists +=
      "<button type='button' class='college delete' id='delete'onclick=''>Delete</button></td></tr>";
  });
  collegeLists += "</table></div>";

  document.getElementById("body").innerHTML = collegeLists;
}

async function addData() {
 // console.log(document.querySelector("input[name='gender']:checked"))
  await fetch("http://localhost:8080/college/", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("name").value.trim(),
      university: document.getElementById("university-name").value.trim(),
      rank: document.getElementById("rank").value.trim(),
      inaugurationDate: document.getElementById("date").value.trim(),
      type: document.querySelector("input[name='gender']:checked").value,
      // type: "MEN_COLLEGE",
      place: document.getElementById("district").value.trim(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getData();
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addData();
});

async function deleteStudent(){
  await fetch("http://localhost:8080/college/{id}", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("name").value.trim(),
    }),
  })};
