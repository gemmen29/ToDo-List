import './style.css';

import LocalStorageHelper from './LocalStorageHelper';
import UpdateStatusHelper from './UpdateStatusHelper';
import TaskOperationsHelper from './TaskOperationsHelper';
import Task from './TaskClass';

const tasksKeyInLocalStorage = 'tasks-list';
class LoadContent {
  static createLiForTask(task) {
    const li = document.createElement('li');

    const containerDivForCheckText = document.createElement('div');
    containerDivForCheckText.classList.add('d-flex', 'center');

    const liCheckBox = document.createElement('input');
    liCheckBox.type = 'checkbox';
    liCheckBox.checked = task.completed;

    liCheckBox.addEventListener('change', (e) => {
      UpdateStatusHelper.toggleStatus(
        task.index,
        TaskOperationsHelper.tasksList,
      );
      LocalStorageHelper.updateEntryInLocalStorage(
        tasksKeyInLocalStorage,
        TaskOperationsHelper.tasksList,
      );

      const taskDescription = e.target.parentNode.querySelector('.task-description');
      if (task.completed) {
        taskDescription.classList.add('description-check');
      } else {
        taskDescription.classList.remove('description-check');
      }
    });

    const liText = document.createElement('input');
    liText.type = 'text';
    liText.value = task.description;
    liText.classList.add('task-description', 'disabled');
    liText.addEventListener('click', (e) => {
      liText.classList.remove('disabled');

      e.target.parentNode.parentNode.querySelector('#edit-btn').classList.add('d-none');
      const deleteBtn = e.target.parentNode.parentNode.querySelector('#delete-btn');
      deleteBtn.classList.remove('d-none');

      const taskDescription = e.target.parentNode.querySelector('.task-description');
      taskDescription.disabled = false;
      taskDescription.focus();
    });
    liText.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        TaskOperationsHelper.edit(task.index, e.target.value);
        LocalStorageHelper.updateEntryInLocalStorage(
          tasksKeyInLocalStorage,
          TaskOperationsHelper.tasksList,
        );
        LoadContent.loadList();
        e.target.disabled = true;
        e.target.blur();
      }
    });
    if (task.completed) {
      liText.classList.add('description-check');
    }

    const editBtn = document.createElement('a');
    editBtn.classList.add('fas', 'fa-ellipsis-v', 'task-link');
    editBtn.id = 'edit-btn';

    editBtn.addEventListener('click', (e) => {
      liText.classList.remove('disabled');
      e.target.classList.add('d-none');
      const deleteBtn = e.target.parentNode.querySelector('#delete-btn');
      deleteBtn.classList.remove('d-none');

      const taskDescription = e.target.parentNode.querySelector('.task-description');
      taskDescription.disabled = false;
      taskDescription.focus();
    });

    const deleteBtn = document.createElement('a');
    deleteBtn.classList.add('far', 'fa-trash-alt', 'task-link', 'd-none');
    deleteBtn.id = 'delete-btn';

    deleteBtn.addEventListener('click', () => {
      TaskOperationsHelper.remove(task.index);
      LocalStorageHelper.updateEntryInLocalStorage(
        tasksKeyInLocalStorage,
        TaskOperationsHelper.tasksList,
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
    if (
      LocalStorageHelper.retrieveFromLocalStorage(tasksKeyInLocalStorage)
      !== null
    ) {
      const tasks = LocalStorageHelper.retrieveFromLocalStorage(
        tasksKeyInLocalStorage,
      );
      TaskOperationsHelper.removeAll();
      TaskOperationsHelper.addMultiple(tasks);
    } else {
      LocalStorageHelper.addToLocalStorage(
        tasksKeyInLocalStorage,
        TaskOperationsHelper.tasksList,
      );
    }
    TaskOperationsHelper.tasksList.sort((a, b) => a.index - b.index);
    const tasksUL = document.querySelector('#tasks');
    tasksUL.innerHTML = '';
    TaskOperationsHelper.tasksList.forEach((task) => {
      tasksUL.appendChild(LoadContent.createLiForTask(task));
    });
  }
}

LoadContent.loadList();

// add event listeners for input
const taskInput = document.querySelector('#task-input');
taskInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && e.target.value !== '') {
    const task = new Task(
      TaskOperationsHelper.tasksList.length,
      e.target.value,
    );
    TaskOperationsHelper.addNew(task);
    LocalStorageHelper.updateEntryInLocalStorage(
      tasksKeyInLocalStorage,
      TaskOperationsHelper.tasksList,
    );
    
    LoadContent.loadList();
    e.target.value = '';
  }
});

// clear all completed tasks
const clearAllCompletedTasksBtn = document.querySelector(
  '#clear-all-completed',
);
clearAllCompletedTasksBtn.addEventListener('click', () => {
  TaskOperationsHelper.removeAllCompleted();
  LocalStorageHelper.updateEntryInLocalStorage(
    tasksKeyInLocalStorage,
    TaskOperationsHelper.tasksList,
  );
  LoadContent.loadList();
});
