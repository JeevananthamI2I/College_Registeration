getData();
const body = document.getElementById("body");
const content = document.getElementById("content");
const toast = document.getElementById("msg-box");
// popup modal
const modal = document.getElementById("modal");
const btn = document.getElementById("add");
const close = document.getElementsByClassName("close")[0];
//head tag
const head = document.getElementById("head");
//submit
const update = document.getElementById("register");
//input values
const nameField = document.getElementById("name");
const universityField = document.getElementById("university-name");
const rankField = document.getElementById("rank");
const inaugurationDateField = document.getElementById("date");
const typeField = document.querySelectorAll("input[name='gender']");
const placeField = document.getElementById("district");

var editId = "";
//const url = "http://localhost:8080/college/"
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
                  <td><button type='button'class='college edit'
                   onclick="updateCollegeValue(${college.id},'${college.name}','${college.university}',
                   ${college.rank},'${college.inaugurationDate}','${college.place}','${college.type}',
                   '${college.code}')" id='edit'>Edit</button>&nbsp
                  <button type='button' class='college delete' onclick="deleteCollege(${college.id})" id='delete'>Delete</button></td>
                  </tr></div>`;
  });
  collegeLists += "</table></div>";
  body.innerHTML = collegeLists;
}

function updateCollegeValue(
  id,
  name,
  university,
  rank,
  inaugurationDate,
  place,
  type
) {
  editId = id;
  if (type == "MEN_COLLEGE") {
    document.getElementById("men").checked = true;
  } else if (type == "WOMEN_COLLEGE") {
    document.getElementById("female").checked = true;
  } else if (type == "COEDUCATION_COLLEGE") {
    document.getElementById("co-ed").checked = true;
  }
  nameField.value = name;
  universityField.value = university;
  rankField.value = rank;
  placeField.value = place;
  inaugurationDateField.value = inaugurationDate.substring(0, 10);
  typeField.value = type;
  head.innerHTML = "Update College Registeration";
  update.innerHTML = "Update";
  content.classList.toggle("active");
  modal.style.display = "block";
}

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var sub = document.getElementById("register");
  if ("Register" === sub.textContent) {
    addData();
  }
  if ("Update" === sub.textContent) {
    editCOllege(editId);
  }
});

async function addData() {
  await fetch("http://localhost:8080/college/", {
    method: "POST",
    body: JSON.stringify({
      name: nameField.value.trim(),
      university: universityField.value.trim(),
      rank: rankField.value.trim(),
      inaugurationDate: inaugurationDateField.value.trim(),
      type: collegeType(),
      place: placeField.value.trim(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getData();
  toast.classList.toggle("toast");
  toast.innerHTML = "Succesfull created!!!";
}

function deleteCollege(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    fetch("http://localhost:8080/college/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      toast.classList.toggle("toast");
      toast.innerHTML = "Succesfull Deleted!!!";
      getData();
    });
  } else {
    toast.classList.toggle("toast");
    toast.innerHTML = "Delete cancel!!!";
  }
}

async function editCOllege(id) {
  await fetch("http://localhost:8080/college/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameField.value.trim(),
      university: universityField.value.trim(),
      rank: rankField.value.trim(),
      inaugurationDate: inaugurationDateField.value.trim(),
      type: collegeType(),
      place: placeField.value.trim(),
    }),
  });
  toast.classList.toggle("toast");
  toast.innerHTML = "Succesfull Updated!!!";
  getData();
}

function collegeType() {
  let gender = "";
  for (const radioButton of typeField) {
    if (radioButton.checked) {
      gender = radioButton.value;
      break;
    }
  }
  return gender;
}

// When the user clicks the button, open the modal
btn.onclick = function () {
  content.classList.toggle("active");
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
  modal.style.display = "none";
  content.classList.remove("active");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// <td data-id='${college.id}'>
// collegeLists += "</table></div>";
// body.innerHTML = collegeLists;
// body.addEventListener("click", (e) => {
//   console.log(e);
//   e.preventDefault();
//   let deleteButtonPressed = e.target.id == "delete";
//   let editButtonPressed = e.target.id == "edit";
//   id = e.target.parentElement.dataset.id;
//   if (deleteButtonPressed) {
//     deleteStudent(id);
//   } else if (editButtonPressed) {
//     var index = data.findIndex((obj) => obj.id == id);

//     if (data[index].type == "MEN_COLLEGE") {
//       document.getElementById("men").checked = true;
//     } else if (data[index].type == "WOMEN_COLLEGE") {
//       document.getElementById("female").checked = true;
//     } else if (data[index].type == "COEDUCATION_COLLEGE") {
//       document.getElementById("co-ed").checked = true;
//     }

//     const nameValue = data[index].name;
//     const universityValue = data[index].university;
//     const rankValue = data[index].rank;
//     const inaugurationDateValue = data[index].inaugurationDate;
//     const placeValue = data[index].place;
//     const type = data[index].type;

//     if (e.target.id == "edit") {
//       head.innerHTML = "Update College Registeration";
//       update.innerHTML = "Update";
//       modal.style.display = "block";

//       nameField.value = nameValue;
//       universityField.value = universityValue;
//       rankField.value = rankValue;
//       placeField.value = placeValue;
//       inaugurationDateField.value = inaugurationDateValue.substring(0, 10);
//       typeField.value = type;

// var sub = document.getElementById("register");
// if (sub.textContent === "Update") {
//   document
//     .getElementById("form")
//     .addEventListener("submit", (event) => {
//       event.preventDefault();
//       editStudent(id);
//     });
// }
//     }
//   }
// });
