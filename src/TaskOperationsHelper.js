import Task from './TaskClass';

export default class TaskOperationsHelper {
  static tasksList = [];

  static addNew(task) {
    if (task instanceof Task) {
      TaskOperationsHelper.tasksList.push(task);
    }
  }

  static reIndex() {
    TaskOperationsHelper.tasksList.forEach((task, counter) => {
      task.index = counter;
    });
  }

  static remove(index) {
    TaskOperationsHelper.tasksList = TaskOperationsHelper.tasksList.filter(
      (task) => task.index !== index,
    );
    TaskOperationsHelper.reIndex();
  }

  static edit(index, newDescription) {
    TaskOperationsHelper.tasksList.forEach((task) => {
      if (index === task.index) {
        task.description = newDescription;
      }
    });
  }

  static removeAllCompleted() {
    TaskOperationsHelper.tasksList = TaskOperationsHelper.tasksList.filter(
      (task) => !task.completed,
    );
    TaskOperationsHelper.reIndex();
  }

  static toggleStatus(index, tasksList) {
    tasksList.map((task) => {
      if (index === task.index) {
        task.completed = !task.completed;
      }
      return task;
    });
  }
}
