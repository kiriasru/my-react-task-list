import {useState} from 'react'

const TaskForm = () => {

    const [task, setTask] = useState('');
    
    return (
        <form>
            <input
                type="text"
                placeholder="Add your new todo"
                value={task}
                onChange = {(e) => setTask(e.target.value)} 
            />
            <button>+</button>
        </form>
    );
}

export default TaskForm