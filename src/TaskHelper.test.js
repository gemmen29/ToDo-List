import TaskHelper from "./TaskHelper";

describe("add new test", () => {
  test("add new task", () => {
    const task = new TaskHelper(0, "New task");
    TaskHelper.addNew(task);
    expect(TaskHelper.tasksList).toHaveLength(1);
    TaskHelper.tasksList.pop();
  });

  test("not valid add", () => {
    TaskHelper.addNew(null);
    expect(TaskHelper.tasksList).toHaveLength(0);
  });
});

describe("remove task", () => {
  test("remove task", () => {
    const task1 = new TaskHelper(0, "New task");
    const task2 = new TaskHelper(1, "New task");
    TaskHelper.addNew(task1);
    TaskHelper.addNew(task2);
    TaskHelper.remove(1);
    expect(TaskHelper.tasksList).toHaveLength(1);
    TaskHelper.tasksList.pop();
  });
});

describe("edit task", () => {
  test("Edit task", () => {
    const task1 = new TaskHelper(0, "New task");
    TaskHelper.addNew(task1);
    TaskHelper.edit(0, "New task description");
    expect(
      TaskHelper.tasksList
        .find((task) => {
          task.description === "New task description";
        })
        .map((task) => {
          return task.description;
        })
    ).toEqual("New task description");
    TaskHelper.tasksList.pop();
  });
});
