// TaskForm.jsx
import { useState } from 'react';
import TaskItem from './TaskItem';
import { FaPlus } from 'react-icons/fa';

const TaskForm = () => {
  const [task, setTask] = useState({ text: '', description: '', completed: false, isEditing: false });
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.text) {
      if (task.isEditing) {
        // Modificar tarea existente
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
    // Iniciar la edición de una tarea
    const taskToEdit = taskList[index];
    setTask({ ...taskToEdit, isEditing: true });
  };

  const cancelEditing = () => {
    // Cancelar la edición
    setTask({ text: '', description: '', completed: false, isEditing: false });
  };

  const deleteTask = (index) => {
    // Eliminar tarea
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
  };

  const toggleTaskCompleted = (index) => {
    // Alternar estado completado
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
  };

  return (
    <div>
      <section style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
        <button onClick={addTask} style={{ marginLeft: '10px' }}>
          {task.isEditing ? 'Update' : 'Add'}
        </button>
        {task.isEditing && (
          <button onClick={cancelEditing} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </section>

      <ul style={{ padding: '0', marginTop: '10px' }}>
        {taskList.map((t, index) => (
          <li
            style={{
              listStyleType: 'none',
              marginBottom: '10px',
              textAlign: 'left',
            }}
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
