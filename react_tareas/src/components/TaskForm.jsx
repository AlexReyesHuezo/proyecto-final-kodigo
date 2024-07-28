import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/tasks',
                    { title: title,
                      description: description,
                      completed: completed
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                );
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleLogout = () => {
        // Elimina el token del almacenamiento local
        localStorage.removeItem('token');
        console.log('Logout exitoso');
        // Redirige al usuario a la página de login
        navigate('/');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">Add Task</button>
                    </div>
                </div>
            </form>
            <button onClick={handleLogout} className="btn btn-secondary mt-3">Logout</button>
        </div>
    )
  
}