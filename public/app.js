document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    // Function to fetch tasks from the server
    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                // Handle tasks, e.g., update the UI
                console.log('Tasks:', tasks);
                renderEditableTasks(tasks);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Function to render tasks in an editable table
    function renderEditableTasks(tasks) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const taskRow = createTaskRow(task);
            taskList.appendChild(taskRow);
        });
    }

    // Function to create a task row with editable fields
    function createTaskRow(task) {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td contenteditable="true">${task.title}</td>
            <td contenteditable="true">${task.description || ''}</td>
            <td contenteditable="true">${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
            <td contenteditable="true">${task.priority}</td>
            <td contenteditable="true">${task.category || ''}</td>
            <td contenteditable="true">${task.status}</td>
            <td>
                <button onclick="updateTask('${task._id}', ${taskRow.rowIndex})">Update</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
                <button onclick="completeTask('${task._id}')">Complete</button>
            </td>
        `;
        return taskRow;
    }

    // Function to add a new task
    function addTask() {
        console.log('Adding task...');

        const taskTitle = document.getElementById('taskTitleInput').value;
        const taskDescription = document.getElementById('taskDescriptionInput').value;
        const taskDueDate = document.getElementById('taskDueDateInput').value;
        const taskPriority = document.getElementById('taskPriorityInput').value;
        const taskCategory = document.getElementById('taskCategoryInput').value;
        const taskStatus = document.getElementById('taskStatusInput').value;

        if (taskTitle.trim() !== '') {
            const newTask = {
                title: taskTitle,
                description: taskDescription,
                dueDate: taskDueDate,
                priority: taskPriority,
                category: taskCategory,
                status: taskStatus,
            };

            // Send a POST request to add the task
            fetch('/api/tasks/createTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            })
                .then(response => response.json())
                .then(newTask => {
                    // Fetch and render tasks again
                    fetchTasks();
                })
                .catch(error => console.error('Error adding task:', error));

            // Clear the input fields
            clearInputFields();
        }
    }

    // Function to update a task
    function updateTask(taskId, rowIndex) {
        const taskRow = document.getElementById('taskList').rows[rowIndex];
        const updatedTask = {
            title: taskRow.cells[0].innerText,
            description: taskRow.cells[1].innerText,
            dueDate: taskRow.cells[2].innerText,
            priority: taskRow.cells[3].innerText,
            category: taskRow.cells[4].innerText,
            status: taskRow.cells[5].innerText,
        };

        // Send a PUT request to update the task
        fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then(response => response.json())
            .then(updatedTask => {
                // Fetch and render tasks again
                fetchTasks();
            })
            .catch(error => console.error('Error updating task:', error));
    }

    // Function to mark a task as completed
    function completeTask(taskId) {
        // Send a PUT request to mark the task as completed
        fetch(`/api/tasks/${taskId}/complete`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(completedTask => {
                // Fetch and render tasks again
                fetchTasks();
            })
            .catch(error => console.error('Error completing task:', error));
    }

    // Function to delete a task
    function deleteTask(taskId) {
        // Send a DELETE request to remove the task
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(deletedTask => {
                // Fetch and render tasks again
                fetchTasks();
            })
            .catch(error => console.error('Error deleting task:', error));
    }

    // Function to clear input fields
    function clearInputFields() {
        document.getElementById('taskTitleInput').value = '';
        document.getElementById('taskDescriptionInput').value = '';
        document.getElementById('taskDueDateInput').value = '';
        document.getElementById('taskPriorityInput').value = 'Medium';
        document.getElementById('taskCategoryInput').value = '';
        document.getElementById('taskStatusInput').value = 'Todo';
    }

    window.fetchTasks = fetchTasks;
    window.renderEditableTasks = renderEditableTasks;
    window.createTaskRow = createTaskRow;
    window.addTask = addTask;
    window.updateTask = updateTask;
    window.completeTask = completeTask;
    window.deleteTask = deleteTask;
    window.clearInputFields = clearInputFields;
});
