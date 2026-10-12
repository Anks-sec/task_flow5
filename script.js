
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

// Add a new task
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();

  if (taskName === "") {
    return;
  }

  createTask(taskName);

  taskInput.value = "";
  taskInput.focus();

  updateEmptyMessage();
});

// Create and display a task
function createTask(taskName) {
  const li = document.createElement("li");
  li.className = "task-item";

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = taskName;

  // Complete button
  const completeButton = document.createElement("button");
  completeButton.className = "complete-btn";
  completeButton.textContent = "Complete";

  completeButton.addEventListener("click", function () {
    const isCompleted = li.classList.toggle("completed");

    completeButton.textContent =
      isCompleted ? "Completed" : "Complete";
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    li.remove();
    updateEmptyMessage();
  });

  // Add elements to the task
  li.appendChild(taskText);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  // Display the task
  taskList.appendChild(li);

  updateEmptyMessage();
}

// Show message when the list is empty
function updateEmptyMessage() {
  emptyMessage.style.display =
    taskList.children.length === 0 ? "block" : "none";
}
