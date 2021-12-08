import LoadContent from './__mocks__/index';
import TaskHelper from './TaskHelper';

jest.mock('./index.js');

describe('Add and Removing task list items', () => {
  test('add new task list item', () => {
    const task = new TaskHelper(0, 'New task');
    TaskHelper.addNew(task);
    document.body.innerHTML = "<div> <ul id='tasks'></ul> </div>";
    // const ul = document.querySelector('#tasks');
    LoadContent.loadList();
    const list = document.querySelectorAll('#tasks li');
    expect(list).toHaveLength(1);
    TaskHelper.tasksList.pop();
    LoadContent.loadList();
  });

  test('remove task list item', () => {
    const task = new TaskHelper(0, 'New task');
    TaskHelper.addNew(task);
    const list = document.querySelectorAll('#tasks li');
    TaskHelper.remove(0);
    LoadContent.loadList();
    expect(list).toHaveLength(0);
  });
});
