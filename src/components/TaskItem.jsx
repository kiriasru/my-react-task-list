// En TaskItem.jsx
import { useState } from 'react';

const TaskItem = ({ task, onModify, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.text);

  const handleUpdate = () => {
    onModify(task.id, newTask);
    setIsEditing(false);
  };

  return (
    <div>
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
        <div>
          <input type="checkbox" checked={task.completed} />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
