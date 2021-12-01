import Task from './TaskClass';

export default class TaskOperationsHelper {
  static tasksList = [];

  static addNew(task) {
    if (task instanceof Task) {
      TaskOperationsHelper.tasksList.push(task);
    }
  }

  static remove(index) {
    let c = 0;
    TaskOperationsHelper.tasksList = TaskOperationsHelper.tasksList
      .filter((task) => task.index !== index)
      .map((task) => {
        task.index = c;
        c += 1;
        return task;
      });
  }

  static edit(index, newDescription) {
    TaskOperationsHelper.tasksList.map((task) => {
      if (index === task.index) {
        task.description = newDescription;
      }
      return task;
    });
  }

  static removeAllCompleted() {
    let c = 0;
    TaskOperationsHelper.tasksList = TaskOperationsHelper.tasksList
      .filter((task) => !task.completed)
      .map((task) => {
        task.index = c;
        c += 1;
        return task;
      });
  }

  static addMultiple(tasks) {
    TaskOperationsHelper.tasksList.push(...tasks);
  }

  static removeAll() {
    TaskOperationsHelper.tasksList = [];
  }
}
