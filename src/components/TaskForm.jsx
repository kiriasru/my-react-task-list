import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import useTaskManager from '../hooks/useTaskManager';
import { getStoredTasks, storeTasks } from '../utils/localStorage';

const TaskForm = () => {
  const [task, setTask] = useState({
    text: '',
    description: '',
    completed: false,
    isEditing: false,
  });
  const { tasks, addTask, deleteTask, updateTask, setTasks } = useTaskManager([]);

  useEffect(() => {
    const storedTasks = getStoredTasks() || [];
    setTasks(storedTasks);
  }, [setTasks]);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  const [taskNameError, setTaskNameError] = useState('');
  const [taskDescError, setTaskDescError] = useState('');

  const handleAddTask = () => {
    const isTitleEmpty = !task.text.trim();
    const isDescriptionFilled = !!task.description.trim();

    if (isTitleEmpty && isDescriptionFilled) {
      setTaskDescError('Task must have a title.');
      setTaskNameError('');
    } else if (task.text.length < 3) {
      setTaskNameError('Task name should be at least 3 characters long.');
      setTaskDescError('');
    } else {
      if (task.isEditing) {
        updateTask({ ...task });
        setTask({ text: '', description: '', completed: false, isEditing: false });
      } else {
        addTask(task);
        setTask({ text: '', description: '', completed: false, isEditing: false });
      }
      setTaskNameError('');
      setTaskDescError('');
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

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    if (name === 'description' && !value.trim() && !task.text.trim()) {
      setTaskDescError('Task must have a title.');
    } else {
      setTaskDescError('');
    }
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (task.text.length >= 3) {
      handleAddTask();
    } else {
      setTaskNameError('Task name should be at least 3 characters long.');
    }
  };

  return (
    <div>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          placeholder="Add your new todo"
          name="text"
          value={task.text}
          onChange={handleTaskChange}
        />
        <input
          type="text"
          placeholder="Task description"
          name="description"
          value={task.description}
          onChange={handleTaskChange}
        />
        <button type="submit">
          {task.isEditing ? 'Update' : 'Add'}
        </button>
        {task.isEditing && (
          <button onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>

      {taskNameError && (
        <div className="error" style={{ color: 'red' }}>
          {taskNameError}
        </div>
      )}

      {taskDescError && (
        <div className="error" style={{ color: 'red' }}>
          {taskDescError}
        </div>
      )}

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
