import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import '../App.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-dark">Task Manager</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Add New Task</h3>
            </div>
            <div className="card-body">
              <TaskForm />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg">
            <div className="card-header bg-secondary text-white text-center">
              <h3>Task List</h3>
            </div>
            <div className="card-body">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
