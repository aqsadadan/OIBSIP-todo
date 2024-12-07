// script.js

const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const addTaskButton = document.getElementById("addTaskButton");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

// Add a new task
addTaskButton.addEventListener("click", () => {
  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();

  if (title === "") {
    alert("Task title is required!");
    return;
  }

  addTask(title, description, false);
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
});

// Add a task to the appropriate list
function addTask(title, description, isCompleted) {
  const list = isCompleted ? completedTasks : pendingTasks;

  const li = document.createElement("li");

  // Task title and description
  const taskTitle = document.createElement("span");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = title;

  const taskDescription = document.createElement("span");
  taskDescription.classList.add("task-description");
  taskDescription.textContent = description;

  // Actions (Edit, Complete, Delete)
  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const completeButton = document.createElement("button");
  completeButton.textContent = isCompleted ? "Undo" : "Complete";
  completeButton.classList.add("complete");
  completeButton.addEventListener("click", () => {
    list.removeChild(li);
    addTask(title, description, !isCompleted);
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit");
  editButton.addEventListener("click", () => {
    const newTitle = prompt("Edit title:", title);
    const newDescription = prompt("Edit description:", description);
    if (newTitle) taskTitle.textContent = newTitle;
    if (newDescription) taskDescription.textContent = newDescription;
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    list.removeChild(li);
  });

  actions.appendChild(completeButton);
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  li.appendChild(taskTitle);
  li.appendChild(taskDescription);
  li.appendChild(actions);
  list.appendChild(li);
}
