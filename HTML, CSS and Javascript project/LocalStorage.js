//this function is adding the values in our localStorage...
function addData() {
  let fullname = document.getElementById("name").value;
  let Email = document.getElementById("email").value;
  let Class = document.getElementById("class").value;
   let existingData = JSON.parse(localStorage.getItem("storage")) || [];

  var newData = {
    name: fullname,
    email: Email,
    Class: Class
  };

  if (!fullname || !Class || !Email) {
    alert("fill All The Fields...");
  } else {

    existingData.push(newData);
    localStorage.setItem("storage", JSON.stringify(existingData));

    fullname.value = "";
    Email.value = "";
    Class.value = "";

  
   display();
  }
}

//this is showing the data that is showen in the localStorage...
  let wrapper = document.getElementById("row-wrapper");

function display() {
	console.log('hii')
  console.log(wrapper);
  
  wrapper.innerHTML = "";
  let existingData = JSON.parse(localStorage.getItem("storage"));
  existingData.forEach((data, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td><input type="Checkbox" name="select">
				  </td> ${data.name}</td>
                  <td>${data.Class}</td>
                  <td>${data.email}</td>
                  <td>
				  <i class="edit-delete fa-solid fa-eye" title='View'></i>
				  <i class="edit-delete fa-solid fa-square-pen" onclick="editOne(${index})" title='Edit'></i>	
				  <i class="edit-delete fa-solid fa-trash-can" onclick="deleteOne(${index})" title='Delete'></i></td>`;
    wrapper.appendChild(tr);

  });
 
  
}


//this will delete the data item from tabel as well as localStorage...
function deleteOne(index) {
  let existingData = JSON.parse(localStorage.getItem("storage")) || [];

  if (index >= 0 && index < existingData.length) {
	  //window.confirm will give true or false value ...
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry? If you press OK than it will delete parmanetaly.."
    );
    if (confirmDelete) {
      existingData.splice(index, 1);
      localStorage.setItem("storage", JSON.stringify(existingData));

      // Refresh the table after deletion
    display();
    }
  }
}


function editOne(index) {
  let existingData = JSON.parse(localStorage.getItem("storage")) || [];
  
  // Assuming you have an edit modal with input fields with IDs: "editName", "editClass", "editEmail"
  let editNameInput = document.getElementById("editName");
  let editClassInput = document.getElementById("editClass");
  let editEmailInput = document.getElementById("editEmail");

  // Populate the modal with existing data
  if (index >= 0 && index < existingData.length) {
    let selectedData = existingData[index];
    editNameInput.value = selectedData.name;
    editClassInput.value = selectedData.Class;
    editEmailInput.value = selectedData.email;

    // Show the edit modal
    showEditModal(index);
  }
}

// Show the edit modal
function showEditModal(index) {
  let editModalOverlay = document.getElementById("edit");
  editModalOverlay.style.display = "flex";

  // Set a custom attribute to store the index of the data being edited
  editModalOverlay.setAttribute("data-index", index);
}

// Close the edit modal

// Update the existing data with edited values
function updateData() {
  let editOverlay = document.getElementById("edit");
  let index = editOverlay.getAttribute("data-index");

  let existingData = JSON.parse(localStorage.getItem("storage")) || [];
  let editedData = {
    name: document.getElementById("editName").value,
    Class: document.getElementById("editClass").value,
    email: document.getElementById("editEmail").value,
  };

  existingData[index] = editedData;
  localStorage.setItem("storage", JSON.stringify(existingData));

  // Close the edit modal and refresh the display

  display();
}
display();