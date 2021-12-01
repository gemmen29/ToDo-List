import './style.css';

const tasks = [{
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
  completed: true,
  index: 2,
}];

function loadList(tasks) {
  tasks.sort((a, b) => a.index - b.index);
  const tasksUL = document.querySelector('#tasks');
  tasks.forEach((task) => {
    const li = document.createElement('li');

    const containerDivForCheckText = document.createElement('div');

    const liCheckBox = document.createElement('input');
    liCheckBox.type = 'checkbox';
    liCheckBox.checked = task.completed;

    const liText = document.createTextNode(task.description);

    const icon = document.createElement('a');
    icon.classList.add('fas', 'fa-ellipsis-v', 'task-link');

    containerDivForCheckText.appendChild(liCheckBox);
    containerDivForCheckText.appendChild(liText);
    li.appendChild(containerDivForCheckText);
    li.appendChild(icon);
    tasksUL.appendChild(li);
  });
}

loadList(tasks);
