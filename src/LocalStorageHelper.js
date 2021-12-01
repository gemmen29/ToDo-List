export default class LocalStorageHelper 
{
  static addToLocalStorage(key, tasksList) {
    localStorage.setItem(key, JSON.stringify(tasksList));
  }

  static retrieveFromLocalStorage(key) {
    if (localStorage.getItem(key) !== null) {
      const tasksList = JSON.parse(localStorage.getItem(key));
      return tasksList;
    }
    return null;
  }

  static updateEntryInLocalStorage(key, tasksList) {
    if (localStorage.getItem(key) !== null) {
      LocalStorageHelper.addToLocalStorage(key, tasksList);
      return 'Updated Successfully';
    }
    return 'Items not found in local storage';
  }
}