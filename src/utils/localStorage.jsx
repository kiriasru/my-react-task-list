const getStoredTasks = () => {
  return JSON.parse(localStorage.getItem('taskList')) || [];
};

const storeTasks = (tasks) => {
  localStorage.setItem('taskList', JSON.stringify(tasks));
};

export { getStoredTasks, storeTasks };
