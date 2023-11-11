import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskItem = ({ task, onModify, onDelete, onToggleCompleted, onStartEditing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleUpdate = () => {
    onModify(newTask, newDescription);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      {isEditing ? (
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FaEdit onClick={handleUpdate} style={{ cursor: 'pointer', marginRight: '5px' }} />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <strong
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '8px', // Ajuste aquí para separar el texto de los iconos
              }}
              onClick={onToggleCompleted}
            >
              {task.text}
            </strong>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '1' }}>
              <FaEdit onClick={() => onStartEditing()} style={{ cursor: 'pointer', marginRight: '5px' }} />
              <FaTrashAlt onClick={handleDelete} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <p style={{ marginTop: '5px' }}>{task.description}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
