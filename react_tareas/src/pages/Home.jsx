import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Home;
