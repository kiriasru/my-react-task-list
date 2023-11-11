// TaskForm.jsx
import { useState } from 'react';
import TaskItem from './TaskItem';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);

  const addTask = () => {
    if (task && taskDescription) {
      setTaskList([...taskList, { text: task, description: taskDescription, completed: false }]);
      setTask('');
      setTaskDescription('');
      setShowDescriptionForm(false);
    }
  };

  const modifyTask = (index, newText, newDescription) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].text = newText;
    updatedTaskList[index].description = newDescription;
    setTaskList(updatedTaskList);
  };

  const deleteTask = (index) => {
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
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={() => setShowDescriptionForm(true)}>+</button>
      </section>

      {showDescriptionForm && (
        <section>
          <input
            type="text"
            placeholder="Add task's description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button onClick={addTask}>Submit</button>
        </section>
      )}

      <ul>
        {taskList.map((t, index) => (
          <li
            style={{
              listStyleType: 'none',
              cursor: 'pointer',
            }}
            key={index}
          >
            <TaskItem
              task={t}
              onModify={(newText, newDescription) => modifyTask(index, newText, newDescription)}
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
