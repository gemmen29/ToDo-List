export default class TaskHelper {
  static tasksList = [];

  constructor(index, description) {
    this.index = index;
    this.description = description;
    this.completed = false;
  }

  static addNew(task) {
    if (task instanceof TaskHelper) {
      TaskHelper.tasksList.push(task);
    }
  }

  static reAssignIndex() {
    TaskHelper.tasksList.forEach((task, counter) => {
      task.index = counter;
    });
  }

  static remove(index) {
    TaskHelper.tasksList = TaskHelper.tasksList.filter(
      (task) => task.index !== index,
    );
    TaskHelper.reAssignIndex();
  }

  static edit(index, newDescription) {
    TaskHelper.tasksList.forEach((task) => {
      if (index === task.index) {
        task.description = newDescription;
      }
    });
  }

  static removeAllCompleted() {
    TaskHelper.tasksList = TaskHelper.tasksList.filter(
      (task) => !task.completed,
    );
    TaskHelper.reAssignIndex();
  }

  static toggleStatus(index) {
    TaskHelper.tasksList.map((task) => {
      if (index === task.index) {
        task.completed = !task.completed;
      }
      return task;
    });
  }
}
