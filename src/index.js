import "./style.css";

import LocalStorageHelper from "./LocalStorageHelper";
import UpdateStatusHelper from "./UpdateStatusHelper";
import { TaskOperationsHelper, tasksList } from "./TaskOperationsHelper";
import Task from "./TaskClass";

const tasksKeyInLocalStorage = "tasks-list";
function createLiForTask(task) {
  const li = document.createElement("li");

  const containerDivForCheckText = document.createElement("div");
  containerDivForCheckText.classList.add("d-flex", "center");

  const liCheckBox = document.createElement("input");
  liCheckBox.type = "checkbox";
  liCheckBox.checked = task.completed;

  liCheckBox.addEventListener("change", (e) => {
    UpdateStatusHelper.toggleStatus(task.index, tasksList);
    LocalStorageHelper.updateEntryInLocalStorage(
      tasksKeyInLocalStorage,
      tasksList
    );

    const taskDescription =
      e.target.parentNode.querySelector(".task-description");
    if (task.completed) {
      taskDescription.classList.add("description-check");
    } else {
      taskDescription.classList.remove("description-check");
    }
  });

  const liText = document.createElement("input");
  liText.type = "text";
  liText.disabled = true;
  liText.value = task.description;
  liText.classList.add("task-description");
  liText.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      TaskOperationsHelper.edit(task.index, e.target.value);
      LocalStorageHelper.updateEntryInLocalStorage(
        tasksKeyInLocalStorage,
        tasksList
      );
      loadList();
      e.target.disabled = true;
      e.target.blur();
    }
  });
  if (task.completed) {
    liText.classList.add("description-check");
  }

  const editBtn = document.createElement("a");
  editBtn.classList.add("fas", "fa-ellipsis-v", "task-link");
  editBtn.id = "edit-btn";

  editBtn.addEventListener("click", (e) => {
    e.target.classList.add("d-none");
    let deleteBtn = e.target.parentNode.querySelector("#delete-btn");
    deleteBtn.classList.remove("d-none");

    let taskDescription =
      e.target.parentNode.querySelector(".task-description");
    taskDescription.disabled = false;
    taskDescription.focus();
  });

  const deleteBtn = document.createElement("a");
  deleteBtn.classList.add("far", "fa-trash-alt", "task-link", "d-none");
  deleteBtn.id = "delete-btn";

  deleteBtn.addEventListener("click", (e) => {
    TaskOperationsHelper.remove(task.index);
    LocalStorageHelper.updateEntryInLocalStorage(
      tasksKeyInLocalStorage,
      tasksList
    );
    loadList();
  });

  containerDivForCheckText.appendChild(liCheckBox);
  containerDivForCheckText.appendChild(liText);
  li.appendChild(containerDivForCheckText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

function loadList() {
  if (
    LocalStorageHelper.retrieveFromLocalStorage(tasksKeyInLocalStorage) !== null
  ) {
    let tasks = LocalStorageHelper.retrieveFromLocalStorage(
      tasksKeyInLocalStorage
    );
    TaskOperationsHelper.removeAll();
    TaskOperationsHelper.addMultiple(tasks);
  } else {
    LocalStorageHelper.addToLocalStorage(tasksKeyInLocalStorage, tasksList);
  }
  tasksList.sort((a, b) => a.index - b.index);
  let tasksUL = document.querySelector("#tasks");
  tasksUL.innerHTML = "";
  tasksList.forEach((task) => {
    tasksUL.appendChild(createLiForTask(task));
  });
}

loadList();

// add event listeners for input
let taskInput = document.querySelector("#task-input");
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value != "") {
    let task = new Task(tasksList.length, e.target.value);
    TaskOperationsHelper.addNew(task);
    LocalStorageHelper.updateEntryInLocalStorage(
      tasksKeyInLocalStorage,
      tasksList
    );
    loadList();
    e.target.value = "";
  }
});

// clear all completed tasks
let clearAllCompletedTasksBtn = document.querySelector("#clear-all-completed");
clearAllCompletedTasksBtn.addEventListener("click", () => {
  TaskOperationsHelper.removeAllCompleted();
  LocalStorageHelper.updateEntryInLocalStorage(
    tasksKeyInLocalStorage,
    tasksList
  );
  loadList();
});
