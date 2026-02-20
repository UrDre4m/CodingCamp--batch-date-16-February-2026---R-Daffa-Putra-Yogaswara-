const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");

let tasks = [];
let currentFilter = "all"; // simpan filter aktif

addBtn.addEventListener("click", addTask);

function addTask() {
    const text = todoInput.value.trim();
    const date = dateInput.value;

    if (text === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    const task = {
        id: Date.now(),
        text,
        date,
        completed: false
    };

    tasks.push(task);
    todoInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleComplete(${task.id})">
                ${task.text} - ${task.date}
            </span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}