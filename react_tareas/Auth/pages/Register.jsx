import React, { useState, useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout';
import { Button, Grid, TextField } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes hacer la solicitud de registro a tu API
    const userData = { email, id: 1 }; // Simulación de datos de usuario
    register(userData);
    navigate('/');
  };

  return (
    <AuthLayout title='Register🚀'>
      <form onSubmit={handleSubmit} className="container mt-5 animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              placeholder="email"
              fullWidth
              name='email'
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              variant="outlined"
              placeholder="Enter password"
              fullWidth
              name='password'
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              // disabled={isAuthenticating}
              variant='contained'
              fullWidth
              type="submit"
              color="secondary">
              Register
            </Button>
          </Grid>

          <Grid container direction='row' justifyContent='end' marginTop="8px">
            <Link component={RouterLink} color='inherit' to="/login">
              Already have an account?
            </Link>

          </Grid>
        </Grid>
      </form>

    </AuthLayout>
  );
};

export default Register;
