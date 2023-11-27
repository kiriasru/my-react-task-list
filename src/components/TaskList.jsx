import TaskItem from './TaskItem';

const TaskList = ({ tasks, startEditing, handleDeleteTask, toggleTaskCompleted }) => {
  return (
    <ul className='added-task'>
      {tasks.map((t, index) => (
        <div className='task-wrapper' key={index}>
          <li className='task-list' key={index}>
            <TaskItem
              task={t}
              onStartEditing={() => startEditing(index)}
              onDelete={() => handleDeleteTask(index)}
              onToggleCompleted={() => toggleTaskCompleted(index)}
            />
          </li>
        </div>
      ))}
    </ul>
  );
};

export default TaskList;
