import { useState } from 'react';

const TaskItem = ({ task, onModify, onDelete, onToggleCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.text);

  const handleUpdate = () => {
    onModify(newTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <>
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onClick={onToggleCompleted}
          >
            {task.text}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={handleDelete}>🗑️</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
