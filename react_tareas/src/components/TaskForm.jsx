import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/tasks',
                    {
                      title: title,
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
                navigate('/home');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        try {
          await axios.post('http://127.0.0.1:8000/api/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Elimina el token del almacenamiento local
          localStorage.removeItem('token');
          console.log('Logout exitoso');
          // Redirige al usuario a la página de login
          navigate('/');
        } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

    return (
      <div className="container mt-5">
        <div className="card shadow-lg bg-primary-subtle">
          <div className="card-header bg-info text-white text-center">
            <h3>Add New Task</h3>
          </div>
          <div className="card-body bg-primary-subtle">
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="completed"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="completed">
                  Completed
                </label>
              </div>
              <div className="d-grid">
                <button className="btn btn-success" type="submit">
                  Add Task
                </button>
              </div>
            </form>
            <button onClick={handleLogout} className="btn border border-danger w-100 mt-3 text-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
}