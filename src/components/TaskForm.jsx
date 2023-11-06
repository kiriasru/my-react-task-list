import {useState} from 'react'

const TaskForm = () => {
// Configurar useState
    const [task, setTask] = useState(''); // task debe ir vacio porque no hay tarea agregada aun
    const [taskList, setTaskList] = useState([]); // lista de tareas

    const addTask = () => {
        if (task) {
            setTaskList([...taskList, task]); // Agrega tasks a la lista
            setTask(''); // Borra el input despues de que se haya agregado una task
        }
    };

    return (
        <div>

            <section>
                <input
                    type="text"
                    placeholder="Add your new todo"
                    value={task}
                    onChange = {(e) => setTask(e.target.value)} 
                />
                <button onClick={addTask}>+</button>
            </section>

            <ul>
                {taskList.map((t, index) => (
                    <li key={index}>{t}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskForm