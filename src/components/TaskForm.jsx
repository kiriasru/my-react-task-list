import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import useTaskManager from '../hooks/useTaskManager';
import { getStoredTasks, storeTasks } from '../utils/localStorage';

const TaskForm = () => {
  const [task, setTask] = useState({ text: '', description: '', completed: false, isEditing: false });
  const { tasks, addTask, deleteTask, updateTask, setTasks } = useTaskManager([]);

  useEffect(() => {
    const storedTasks = getStoredTasks() || [];
    setTasks(storedTasks);
  }, [setTasks]);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (task.text) {
      if (task.isEditing) {
        updateTask({ ...task });
        setTask({ text: '', description: '', completed: false, isEditing: false });
      } else {
        addTask(task);
        setTask({ text: '', description: '', completed: false, isEditing: false });
      }
    }
  };

  const startEditing = (index) => {
    const taskToEdit = tasks[index];
    setTask({ ...taskToEdit, isEditing: true });
  };

  const cancelEditing = () => {
    setTask({ text: '', description: '', completed: false, isEditing: false });
  };

  const handleDeleteTask = (index) => {
    deleteTask(tasks[index].id);
  };

  const toggleTaskCompleted = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask);
  };

  return (
    <div>
      <section>
        <input
          type="text"
          placeholder="Add your new todo"
          value={task.text}
          onChange={(e) => setTask({ ...task, text: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button onClick={handleAddTask}>
          {task.isEditing ? 'Update' : 'Add'}
        </button>
        {task.isEditing && (
          <button onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </section>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <TaskItem
              task={t}
              onStartEditing={() => startEditing(index)}
              onDelete={() => handleDeleteTask(index)}
              onToggleCompleted={() => toggleTaskCompleted(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
