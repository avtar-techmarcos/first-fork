	document.addEventListener('DOMContentLoaded', function() {
        loadEntries();
    });

    function addEntry() {
        var name = document.getElementById('name').value;
        var classValue = document.getElementById('class').value;
        var email = document.getElementById('email').value;


        if (!name || !classValue || !email) {
            alert("Please fill in all fields.");
            return;
        }

        var entry = {
            name: name,
            class: classValue,
            email: email
        };

        var entries = JSON.parse(localStorage.getItem('entries')) || [];

        entries.push(entry);

        localStorage.setItem('entries', JSON.stringify(entries));

        loadEntries();

        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('class').value = '';
        document.getElementById('email').value = '';
    }

    function loadEntries() {
        var entries = JSON.parse(localStorage.getItem('entries')) || [];

        var table = document.getElementById('registrationTable');

        table.innerHTML = '<tr><th>Name</th><th>Class</th><th>Email</th><th>Action</th></tr>';

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var row = table.insertRow(-1);

            var nameCell = row.insertCell(0);
            var classCell = row.insertCell(1);
            var emailCell = row.insertCell(2);
            var actionCell = row.insertCell(3);

            nameCell.innerHTML = entry.name;
            classCell.innerHTML = entry.class;
            emailCell.innerHTML = entry.email;
            actionCell.innerHTML = '<button onclick="showEditForm(' + i + ')">Edit</button> ' +
                                   '<button onclick="deleteEntry(' + i + ')">Delete</button>';
        }
    }


function showEditForm(index) {
            var entries = JSON.parse(localStorage.getItem('entries')) || [];

            document.getElementById('editName').value = entries[index].name;
            document.getElementById('editClass').value = entries[index].class;
            document.getElementById('editEmail').value = entries[index].email;

            var editForm = document.getElementById('editForm');
            editForm.style.display = 'block';

            // Store the index of the entry being edited
            editForm.dataset.editIndex = index;
        }

        function updateEntry() {
            var editForm = document.getElementById('editForm');
            var index = editForm.dataset.editIndex;
            if (index === undefined) {
                return; // No index, nothing to update
            }

            var newName = document.getElementById('editName').value;
            var newClass = document.getElementById('editClass').value;
            var newEmail = document.getElementById('editEmail').value;

            var entries = JSON.parse(localStorage.getItem('entries')) || [];

            if (newName !== "") {
                entries[index].name = newName;
            }

            if (newClass !== "") {
                entries[index].class = newClass;
            }

            if (newEmail !== "") {
                entries[index].email = newEmail;
            }

            localStorage.setItem('entries', JSON.stringify(entries));
            loadEntries();

            // Reset the form and hide it
            editForm.style.display = 'none';
        }


    function deleteEntry(index) {
        var entries = JSON.parse(localStorage.getItem('entries')) || [];

        entries.splice(index, 1);

        localStorage.setItem('entries', JSON.stringify(entries));

        loadEntries();
    }
	
	
	
	