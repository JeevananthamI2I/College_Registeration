getData();
const body = document.getElementById("body");
// Get the modal
const modal = document.getElementById("modal");

// Get the button that opens the modal
const btn = document.getElementById("add");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

async function getData() {
  const response = await fetch("http://localhost:8080/college/");
  const data = await response.json();
  collegeLists = `<div class='content'>
    <table class='table'>
    <tr><th>Name</th>
    <th>University</th>
    <th>Rank</th>
    <th>Date</th>
    <th>Place</th>
    <th>Type</th>
    <th>Code</th>
    <th>Options</th></tr>`;
  data.forEach((college) => {
    collegeLists += `
                 <tr><td>${college.name}</td>
                  <td>${college.university}</td>
                  <td>${college.rank}</td>
                  <td>${college.inaugurationDate}</td>
                  <td>${college.place}</td>
                  <td>${college.type}</td>
                  <td>${college.code}</td>
                  <td data-id='${college.id}'>
                  <span data-id='${college}'><button type='button'class='college edit' id='edit'>Edit</button></span>&nbsp
                  <button type='button' class='college delete' id='delete'>Delete</button></td>
                  </tr></div>`;
  });
  collegeLists += "</table></div>";
  body.innerHTML = collegeLists;
  //console.log(collegeLists);
  body.addEventListener("click", (e) => {
    e.preventDefault();
    let deleteButtonPressed = e.target.id == "delete";
    let editButtonPressed = e.target.id== "edit";
    let id = e.target.parentElement.dataset.id;
    let obj = e.target.parentElement.dataset.id;
    console.log(obj.place)
    if (deleteButtonPressed) {
      deleteStudent(id);
    } else if (editButtonPressed) {
      // getById(id);
     // editStudent(id)
    }
  });
}

async function addData() {
  await fetch("http://localhost:8080/college/", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("name").value.trim(),
      university: document.getElementById("university-name").value.trim(),
      rank: document.getElementById("rank").value.trim(),
      inaugurationDate: document.getElementById("date").value.trim(),
      type: document.querySelector("input[name='gender']:checked").value,
      place: document.getElementById("district").value.trim(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getData();
}

function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    fetch("http://localhost:8080/college/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.reload();
    });
  } else {
    console.log("Delete canceled");
  }
}

async function getById(id) {
  const response = await fetch("http://localhost:8080/college/" + id);
  const data = await response.json();
  college = `<div class='content'>
    <table class='table'>
    <tr><th>Name</th>
    <th>University</th>
    <th>Rank</th>
    <th>Date</th>
    <th>Place</th>
    <th>Type</th>
    <th>Code</th>
    <th>Options</th></tr>
                 <tr><td>${data.name}</td>
                  <td>${data.university}</td>
                  <td>${data.rank}</td>
                  <td>${data.inaugurationDate}</td>
                  <td>${data.place}</td>
                  <td>${data.type}</td>
                  <td>${data.code}</td>
                  <td data-id='${data.id}'>
                  <button type='button'class='college edit' id='edit'>Edit</button>&nbsp
                  <button type='button' class='college delete' id='delete'>Delete</button></td>
                  </tr></div></table></div>`;
  body.innerHTML = college;
}

function editStudent(id) {
  document.getElementById("head").innerHTML="Update College Registeration"
  fetch("http://localhost:8080/college/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("name").value.trim(),
      university: document.getElementById("university-name").value.trim(),
      rank: document.getElementById("rank").value.trim(),
      inaugurationDate: document.getElementById("date").value.trim(),
      type: document.querySelector("input[name='gender']:checked").value,
      place: document.getElementById("district").value.trim(),
    }),
  });
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addData();
});

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
