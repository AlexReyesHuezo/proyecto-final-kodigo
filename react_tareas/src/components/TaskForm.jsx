import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = e => {
    e.preventDefault();
    addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="New Task"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">Add Task</button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
