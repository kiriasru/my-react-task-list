import TaskList from './TaskList';

const Tareas = ({ tasks, startEditing, handleDeleteTask, toggleTaskCompleted }) => {
  return (
    <div>
      <h2>Listado de Tareas</h2>
      <TaskList
        tasks={tasks}
        startEditing={startEditing}
        handleDeleteTask={handleDeleteTask}
        toggleTaskCompleted={toggleTaskCompleted}
      />
    </div>
  );
};

export default Tareas;
