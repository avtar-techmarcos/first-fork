function addTask(){
            
            var taskInput = document.getElementById("taskInput");
            var taskText = taskInput.value;

                var listItem = document.createElement("li");
                listItem.textContent = taskText;

                var taskList = document.getElementById("taskList");
                taskList.appendChild(listItem);
        }