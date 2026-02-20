const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

addBtn.addEventListener("click", addTask);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

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
    saveTasks();
    renderTasks();

    todoInput.value = "";
    dateInput.value = "";
}

function renderTasks() {
    todoList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filteredTasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
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
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();