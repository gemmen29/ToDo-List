export default class UpdateStatusHelper {
  static toggleStatus(index, tasksList) {
    tasksList.map((task) => {
      if (index === task.index) {
        task.completed = !task.completed;
      }
      return task;
    });
  }
}