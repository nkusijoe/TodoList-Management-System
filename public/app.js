document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                // Handle tasks, e.g., update the UI
                console.log('Tasks:', tasks);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Add more client-side code as needed
});
