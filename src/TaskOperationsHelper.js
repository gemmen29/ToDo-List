import Task from "./TaskClass";

let tasksList = [];

class TaskOperationsHelper {
  static addNew(task) {
    console.log(task instanceof Task);
    if (task instanceof Task) {
      tasksList.push(task);
    }
  }

  static remove(index) {
    let c = 0;
    tasksList = tasksList
      .filter((task) => task.index !== index)
      .map((task) => {
        task.index = c++;
        return task;
      });
  }

  static edit(index, newDescription) {
    tasksList.map((task) => {
      if (index === task.index) {
        task.description = newDescription;
      }
    });
  }

  static removeAllCompleted() {
    let c = 0;
    tasksList = tasksList
      .filter((task) => !task.completed)
      .map((task) => {
        task.index = c++;
        return task;
      });
  }

  static addMultiple(tasks) {
    tasksList.push(...tasks);
  }

  static removeAll() {
    tasksList = [];
  }
}

export { TaskOperationsHelper, tasksList };
