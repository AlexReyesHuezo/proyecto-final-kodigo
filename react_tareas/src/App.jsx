import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';


const App = () => {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<TaskList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/taskregister" element={<TaskForm />} />
          </Routes>
        </Router>
  );
};

export default App;
