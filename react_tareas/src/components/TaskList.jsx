import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

    return (
        <div>
        {tasks.map((task) => (
            <div key={task.id}>
                <h1>{task.title}</h1>
                <h1>{task.description}</h1>
                <h1>{task.completed}</h1>
            </div>
        ))}
    </div>
    )
}
