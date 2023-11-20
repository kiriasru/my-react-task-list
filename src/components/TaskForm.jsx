import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import useTaskManager from './useTaskManager'; // Importando el hook

const TaskForm = () => {
  const [task, setTask] = useState({ text: '', description: '', completed: false, isEditing: false });

  // Reemplazando el estado local por el hook personalizado
  const { tasks, addTask, deleteTask, updateTask } = useTaskManager([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
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

  const deleteTask = (index) => {
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
        <button onClick={addTask}>
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
              onDelete={() => deleteTask(index)}
              onToggleCompleted={() => toggleTaskCompleted(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
