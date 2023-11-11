// TaskItem.jsx
import { useState } from 'react';

const TaskItem = ({ task, onModify, onDelete, onToggleCompleted }) => {
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
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <strong
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '15px', // Puedes ajustar este margen según tus necesidades
              }}
              onClick={onToggleCompleted}
            >
              {task.text}
            </strong>
            <button style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
              ✏️
            </button>
            <button style={{ cursor: 'pointer', marginLeft: '15px' }} onClick={handleDelete}>
              🗑️
            </button>
          </div>
          <p style={{ marginTop: '5px' }}>{task.description}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
