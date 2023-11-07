import { useState } from 'react';
import TaskItem from './TaskItem';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task) {
      setTaskList([...taskList, { text: task, completed: false }]);
      setTask('');
    }
  };

  const modifyTask = (index, newText) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].text = newText;
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
        <button onClick={addTask}>+</button>
      </section>

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
              onModify={(newText) => modifyTask(index, newText)}
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
