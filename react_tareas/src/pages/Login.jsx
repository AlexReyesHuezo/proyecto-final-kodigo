import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PruebaLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ESPERA DE LA API:)
        try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password,
        });
    
        // Guarda el token en el almacenamiento local o en un estado global
        localStorage.setItem('token', response.data.access_token);
    
        console.log('Login exitoso:', response.data.access_token);
        navigate('/home');
        } catch (error) {
        console.error('Error al iniciar sesión:', error);
        }
    };

    //NOTA MEJORAR DISEñO Y PEDIR AYUDA YA QUE NO TENGO BUENA IMAGINACION

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}
