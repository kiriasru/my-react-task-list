import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { FaPlus } from 'react-icons/fa';

const TaskForm = () => {
  const [task, setTask] = useState({ text: '', description: '', completed: false, isEditing: false });
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
    setTaskList(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = () => {
    if (task.text) {
      if (task.isEditing) {
        const updatedTaskList = taskList.map((t) => (t.id === task.id ? { ...task } : t));
        setTaskList(updatedTaskList);
        setTask({ text: '', description: '', completed: false, isEditing: false });
      } else {
        // Agregar nueva tarea
        setTaskList([...taskList, { ...task, id: Date.now() }]);
        setTask({ text: '', description: '', completed: false, isEditing: false });
      }
    }
  };

  const startEditing = (index) => {
    const taskToEdit = taskList[index];
    setTask({ ...taskToEdit, isEditing: true });
  };

  const cancelEditing = () => {
    setTask({ text: '', description: '', completed: false, isEditing: false });
  };

  const deleteTask = (index) => {
    // Eliminar tarea
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
  };

  const toggleTaskCompleted = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
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
        {taskList.map((t, index) => (
          <li
            key={index}
          >
            <TaskItem
              task={t}
              onModify={(newText, newDescription) => setTask({ text: newText, description: newDescription, completed: false, isEditing: true })}
              onDelete={() => deleteTask(index)}
              onToggleCompleted={() => toggleTaskCompleted(index)}
              onStartEditing={() => startEditing(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
