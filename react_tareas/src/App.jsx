import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const isAuthenticated = localStorage.getItem('token');

  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
