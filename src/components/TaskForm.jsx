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

  const [taskNameError, setTaskNameError] = useState('');

  const handleAddTask = () => {
    if (task.text.length >= 3) {
      if (task.isEditing) {
        updateTask({ ...task });
        setTask({ text: '', description: '', completed: false, isEditing: false });
      } else {
        addTask(task);
        setTask({ text: '', description: '', completed: false, isEditing: false });
      }
      setTaskNameError('');
    } else {
      setTaskNameError('Task name should be at least 3 characters long.');
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
      <form className='container-form' onSubmit={handleTaskSubmit}>
        <label className='subtitle'>Add new task:</label>
        <input className='add-task'
          type="text"
          placeholder="Add your new todo"
          name="text"
          value={task.text}
          onChange={handleTaskChange}
        /><br/>
        <label className='subtitle2'>Task Description:</label>
        <input className='add-description'
          type="text"
          placeholder="Task description (optional)"
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

      <ul className='added-task'>
        {tasks.map((t, index) => (
          <div className='task-wrapper' key={ index }>
          <li className='task-list' key={index}>
            <TaskItem
              task={t}
              onStartEditing={() => startEditing(index)}
              onDelete={() => handleDeleteTask(index)}
              onToggleCompleted={() => toggleTaskCompleted(index)}
            />
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
