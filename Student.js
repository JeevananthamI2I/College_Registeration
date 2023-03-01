const nameField = document.getElementById("name");
const universityField = document.getElementById("university-name");
const rankField = document.getElementById("rank");
const inaugurationDateField = document.getElementById("date");
const typeField = document.querySelectorAll("input[name='gender']");
const placeField = document.getElementById("district");

let editId = "";
const url = "http://localhost:8080/college/";
getData();
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  collegeLists = `<div class='content'>
    <table class='table'>
    <tr><th>S.No</th>
    <th>Name</th>
    <th>University</th>
    <th>Rank</th>
    <th>Date</th>
    <th>Place</th>
    <th>Type</th>
    <th>Code</th>
    <th>Options</th></tr>`;
  data.forEach((college) => {
    collegeLists += `
                 <tr><td></td>
                 <td>${college.name}</td>
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
  document.getElementById("body").innerHTML = collegeLists;
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
  document.getElementById("head").innerHTML = "Update College Registeration";
  document.getElementById("register").innerHTML = "Update";
  document.getElementById("content").classList.toggle("active");
  document.getElementById("modal").style.display = "block";
}

function addData() {
  fetch(url, {
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
  }).then((res) => {
    if (res.ok) {
      document.getElementById("msg-box").classList.toggle("toast");
      document.getElementById("msg-box").innerHTML = "Succesfull created";
      setTimeout(() => {
        document.getElementById("msg-box").classList.remove("toast");
        document.getElementById("msg-box").innerHTML = "";
      }, 3000);
      getData();
      location.reload()
    } else {
      document.getElementById("msg-box").classList.toggle("error-toast");
      document.getElementById("msg-box").innerHTML = "Something went wrong!!!";
      setTimeout(() => {
        document.getElementById("msg-box").classList.remove("error-toast");
        document.getElementById("msg-box").innerHTML = "";
      }, 3000);
    }
  });
}

function deleteCollege(id) {
  fetch(url + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      document.getElementById("msg-box").classList.toggle("toast");
      document.getElementById("msg-box").innerHTML = "Succesfull Deleted!!!";
      setTimeout(() => {
        document.getElementById("msg-box").classList.remove("toast");
        document.getElementById("msg-box").innerHTML = "";
      }, 3000);
      getData();
    } else {
      document.getElementById("msg-box").classList.toggle("error-toast");
      document.getElementById("msg-box").innerHTML = "Something went wrong!!!";
      setTimeout(() => {
        document.getElementById("msg-box").classList.remove("error-toast");
        document.getElementById("msg-box").innerHTML = "";
      }, 3000);
    }
  });
}

function editCOllege(id) {
  fetch(url + id, {
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
  }).then((res) => {
    if (res.status === 200) {
      document.getElementById("msg-box").classList.toggle("toast");
      document.getElementById("msg-box").innerHTML = "Succesfull Updated!!!";
      setTimeout(() => {
        document.getElementById("msg-box").classList.remove("toast");
        document.getElementById("msg-box").innerHTML = "";
      }, 3000);
      getData();
    } else {
      document.getElementById("msg-box").classList.toggle("error-toast");
      document.getElementById("msg-box").innerHTML = "Something went wrong!!!";
      setTimeout(() => {
        document.getElementById("msg-box").classList.remove("error-toast");
        document.getElementById("msg-box").innerHTML = "";
      }, 3000);
    }
  });
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

document.getElementById("add").onclick = function () {
  document.getElementById("content").classList.toggle("active");
  document.getElementById("modal").style.display = "block";
};

document.getElementsByClassName("close")[0].onclick = function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("content").classList.remove("active");
};

document.getElementById("");

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var sub = document.getElementById("register");
  if ("Register" === sub.textContent) {
    addData();
    document.getElementById("modal").style.display = "none";
    document.getElementById("content").classList.remove("active");
    // document.getElementById("form").reset();
  }
  if ("Update" === sub.textContent) {
    editCOllege(editId);
    document.getElementById("modal").style.display = "none";
    document.getElementById("content").classList.remove("active");
    // document.getElementById("form").reset();
  }

  
});
