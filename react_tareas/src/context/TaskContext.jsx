import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);  // Asegurarse de que tasks siempre sea un array
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const response = await axios.post('/api/tasks', { text: task });
    setTasks([...tasks, response.data]);
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const response = await axios.put(`/api/tasks/${taskId}`, {
      completed: !task.completed
    });
    setTasks(tasks.map(task =>
      task.id === taskId ? response.data : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
