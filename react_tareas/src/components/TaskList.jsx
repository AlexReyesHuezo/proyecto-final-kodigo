import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Obtener el token del almacenamiento local
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setTasks([]); // Asegurarse de que tasks siempre sea un array
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const task = tasks.find((task) => task.id === id);
            await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, {
                title: task.title,
                description: task.description,
                completed: !task.completed }, {headers:
                    {Authorization: `Bearer ${token}`},
            });
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            }));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div>
          {tasks.map((task) => (
            <div key={task.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <button className="btn btn-secondary" onClick={() => handleToggleComplete(task.id, !task.completed)}>
                  {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
    );
}
