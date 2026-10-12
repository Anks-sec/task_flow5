const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const formMessage = document.querySelector("#form-message");
const emptyState = document.querySelector("#empty-state");

const tasks = [];

function showMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`.trim();
}

function updateTaskCount() {
  const total = tasks.length;
  taskCount.textContent = `${total} ${total === 1 ? "task" : "tasks"}`;
}

function renderTasks() {
  // Keep the empty-state message visible only when there are no tasks.
  emptyState.hidden = tasks.length > 0;

  // Remove previous task rows while keeping the empty-state element.
  taskList.querySelectorAll(".task-item").forEach((item) => item.remove());

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const number = document.createElement("span");
    number.className = "task-number";
    number.textContent = String(index + 1).padStart(2, "0");
    number.setAttribute("aria-hidden", "true");

    const title = document.createElement("p");
    title.className = "task-text";
    // textContent safely displays user input without interpreting it as HTML.
    title.textContent = task.title;

    const label = document.createElement("span");
    label.className = "new-label";
    label.textContent = "Added";

    listItem.append(number, title, label);
    taskList.appendChild(listItem);
  });

  updateTaskCount();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  // Do not add an empty or whitespace-only task.
  if (!title) {
    showMessage("Please enter a task title before adding it.", "error");
    taskInput.focus();
    return;
  }

  tasks.push({
    id: Date.now(),
    title
  });

  renderTasks();
  taskForm.reset();
  showMessage("Task added successfully.", "success");
  taskInput.focus();
});
