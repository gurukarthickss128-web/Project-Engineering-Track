let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

// Add task on Enter
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const text = taskInput.value.trim();
        if (text === "") return;

        tasks.push({
            id: Date.now(),
            text: text,
            completed: false
        });

        taskInput.value = "";
        renderTasks();
    }
});

// Render tasks to UI
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const left = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        left.appendChild(checkbox);
        left.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        li.appendChild(left);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Filters
allBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderTasks();
});

activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    renderTasks();
});

completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks();
});