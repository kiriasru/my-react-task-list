import { useState } from 'react';

const useTaskManager = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    setTasks,
  };
};

export default useTaskManager;
