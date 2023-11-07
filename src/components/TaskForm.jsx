import {useState} from 'react'

const TaskForm = () => {
// Configurar useState
    const [task, setTask] = useState(''); // task debe ir vacio porque no hay tarea agregada aun
    const [taskList, setTaskList] = useState([]); // lista de tareas

    const markTaskAsCompleted = (index) => {
        const updatedTaskList = [...taskList]
        updatedTaskList[index].completed = !updatedTaskList[index].completed;
        setTaskList(updatedTaskList);
    }

    const addTask = () => {
        if (task) {
            setTaskList([...taskList,
                 { text: task, completed: false }]); // Agrega tasks a la lista
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
                    <li
                     style={{
                        listStyleType: 'none', 
                        cursor: 'pointer',
                        textDecoration: t.completed ? 'line-through': 'none',
                     }} 
                     key={index}
                     onClick={() => markTaskAsCompleted(index)}
                     >{t.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskForm