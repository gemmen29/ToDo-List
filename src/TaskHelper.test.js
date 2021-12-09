import TaskHelper from './TaskHelper';

describe('add new test', () => {
  test('add new task', () => {
    const task = new TaskHelper(0, 'New task');
    TaskHelper.addNew(task);
    expect(TaskHelper.tasksList).toHaveLength(1);
    TaskHelper.tasksList.pop();
  });

  test('not valid add', () => {
    TaskHelper.addNew(null);
    expect(TaskHelper.tasksList).toHaveLength(0);
  });
});

describe('remove task', () => {
  test('remove task', () => {
    const task1 = new TaskHelper(0, 'New task');
    const task2 = new TaskHelper(1, 'New task');
    TaskHelper.addNew(task1);
    TaskHelper.addNew(task2);
    TaskHelper.remove(1);
    expect(TaskHelper.tasksList).toHaveLength(1);
    TaskHelper.tasksList.pop();
  });
});

describe('edit task', () => {
  test('Edit task', () => {
    const task1 = new TaskHelper(0, 'New task');
    TaskHelper.addNew(task1);
    TaskHelper.edit(0, 'New task description');
    expect(
      TaskHelper.tasksList.filter((task) => task.description === 'New task description')[0].description,
    ).toEqual('New task description');
    TaskHelper.tasksList.pop();
  });
});

describe('update task status', () => {
  test('Update task status', () => {
    const task1 = new TaskHelper(0, 'New task');
    TaskHelper.addNew(task1);
    TaskHelper.toggleStatus(0);
    expect(
      TaskHelper.tasksList.filter((task) => task.description === 'New task')[0].completed,
    ).toEqual(true);
    TaskHelper.tasksList.pop();
  });
});

describe('Clear all completed tasks', () => {
  test('Clear all completed tasks', () => {
    const task1 = new TaskHelper(0, 'New task 1');
    const task2 = new TaskHelper(1, 'New task 2');
    const task3 = new TaskHelper(2, 'New task 3');
    TaskHelper.addNew(task1);
    TaskHelper.addNew(task2);
    TaskHelper.addNew(task3);
    TaskHelper.toggleStatus(0);
    TaskHelper.toggleStatus(1);
    TaskHelper.toggleStatus(2);
    TaskHelper.removeAllCompleted();
    expect(TaskHelper.tasksList).toHaveLength(0);
  });
});
