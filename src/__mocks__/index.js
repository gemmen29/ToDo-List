import TaskHelper from "../TaskHelper";

const tasksKeyInLocalStorage = "tasks-list";
export default class LoadContent {
  static createLiForTask(task) {
    const li = document.createElement("li");

    const containerDivForCheckText = document.createElement("div");
    containerDivForCheckText.classList.add("d-flex", "center");

    const liCheckBox = document.createElement("input");
    liCheckBox.type = "checkbox";
    liCheckBox.checked = task.completed;

    liCheckBox.addEventListener("change", (e) => {
      TaskHelper.toggleStatus(task.index, TaskHelper.tasksList);

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
    liText.value = task.description;
    liText.classList.add("task-description", "disabled");
    liText.addEventListener("click", (e) => {
      liText.classList.remove("disabled");

      e.target.parentNode.parentNode
        .querySelector("#edit-btn")
        .classList.add("d-none");
      const deleteBtn =
        e.target.parentNode.parentNode.querySelector("#delete-btn");
      deleteBtn.classList.remove("d-none");

      const taskDescription =
        e.target.parentNode.querySelector(".task-description");
      taskDescription.disabled = false;
      taskDescription.focus();
    });
    liText.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        TaskHelper.edit(task.index, e.target.value);
        LocalStorageHelper.updateEntryInLocalStorage(
          tasksKeyInLocalStorage,
          TaskHelper.tasksList
        );
        LoadContent.loadList();
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
      liText.classList.remove("disabled");
      e.target.classList.add("d-none");
      const deleteBtn = e.target.parentNode.querySelector("#delete-btn");
      deleteBtn.classList.remove("d-none");

      const taskDescription =
        e.target.parentNode.querySelector(".task-description");
      taskDescription.disabled = false;
      taskDescription.focus();
    });

    const deleteBtn = document.createElement("a");
    deleteBtn.classList.add("far", "fa-trash-alt", "task-link", "d-none");
    deleteBtn.id = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      TaskHelper.remove(task.index);
      LocalStorageHelper.updateEntryInLocalStorage(
        tasksKeyInLocalStorage,
        TaskHelper.tasksList
      );
      LoadContent.loadList();
    });

    containerDivForCheckText.appendChild(liCheckBox);
    containerDivForCheckText.appendChild(liText);
    li.appendChild(containerDivForCheckText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
  }

  static loadList() {
    //    const tasks = TaskHelper.tasksList;
    TaskHelper.tasksList.sort((a, b) => a.index - b.index);
    const tasksUL = document.querySelector("#tasks");
    tasksUL.innerHTML = "";
    TaskHelper.tasksList.forEach((task) => {
      tasksUL.appendChild(LoadContent.createLiForTask(task));
    });
  }
}
