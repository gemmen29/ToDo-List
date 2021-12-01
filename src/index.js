import './style.css';

import LocalStorageHelper from './LocalStorageHelper';
import UpdateStatusHelper from './UpdateStatusHelper';

let tasksList = [
  {
    description: 'task 1 description',
    completed: false,
    index: 3,
  },
  {
    description: 'task 2 description',
    completed: false,
    index: 1,
  },
  {
    description: 'task 3 description',
    completed: false,
    index: 2,
  },
];

const tasksKeyInLocalStorage = 'tasks-list';
function createLiForTask(task) {
  const li = document.createElement('li');

  const containerDivForCheckText = document.createElement('div');
  containerDivForCheckText.classList.add('d-flex', 'center');

  const liCheckBox = document.createElement('input');
  liCheckBox.type = 'checkbox';
  liCheckBox.checked = task.completed;

  liCheckBox.addEventListener('change', (e) => {
    UpdateStatusHelper.toggleStatus(task.index, tasksList);
    LocalStorageHelper.updateEntryInLocalStorage(
      tasksKeyInLocalStorage,
      tasksList,
    );

    const taskDescription = e.target.parentNode.querySelector('.task-description');
    if (task.completed) {
      taskDescription.classList.add('description-check');
    } else {
      taskDescription.classList.remove('description-check');
    }
  });

  const liText = document.createElement('div');
  liText.classList.add('task-description');
  liText.textContent = task.description;
  if (task.completed) {
    liText.classList.add('description-check');
  }

  const icon = document.createElement('a');
  icon.classList.add('fas', 'fa-ellipsis-v', 'task-link');

  containerDivForCheckText.appendChild(liCheckBox);
  containerDivForCheckText.appendChild(liText);
  li.appendChild(containerDivForCheckText);
  li.appendChild(icon);

  return li;
}

function loadList() {
  if (
    LocalStorageHelper.retrieveFromLocalStorage(tasksKeyInLocalStorage) !== null
  ) {
    tasksList = LocalStorageHelper.retrieveFromLocalStorage(
      tasksKeyInLocalStorage,
    );
  } else {
    LocalStorageHelper.addToLocalStorage(tasksKeyInLocalStorage, tasksList);
  }
  tasksList.sort((a, b) => a.index - b.index);
  const tasksUL = document.querySelector('#tasks');
  tasksList.forEach((task) => {
    tasksUL.appendChild(createLiForTask(task));
  });
}

loadList();
