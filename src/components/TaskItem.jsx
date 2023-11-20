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
        <div>
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
          <div>
            <FaEdit onClick={handleUpdate} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <strong
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={onToggleCompleted}
            >
              {task.text}
            </strong>
            <div>
              <FaEdit onClick={() => onStartEditing()} style={{ cursor: 'pointer' }} />
              <FaTrashAlt onClick={handleDelete} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
