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
