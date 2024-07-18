document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            updateLocalStorage();
            renderTasks();
        }
    });

    // Edit task
    window.editTask = (index) => {
        const newTaskText = prompt('Edit your task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            updateLocalStorage();
            renderTasks();
        }
    };

    // Toggle task completion
    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    };

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    };

    // Update local storage
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
