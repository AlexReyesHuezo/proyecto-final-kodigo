import axios from 'axios';
import{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Login() {
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
        console.log(response.data);
        navigate('/home');
        } catch (error) {
        console.error('Error al iniciar sesión:', error);
        }
    };

    //NOTA MEJORAR DISEñO Y PEDIR AYUDA YA QUE NO TENGO BUENA IMAGINACION

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                  <a href="/register" className="btn btn-link">Don´t have an account? Register here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
