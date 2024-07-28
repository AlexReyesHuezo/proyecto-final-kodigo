import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { toggleTaskCompletion } = useContext(TaskContext);

  return (
    <>
      <button
      className={`list-group-item list-group-item-action ${task.completed ? 'list-group-item-success' : ''}`}
      onClick={() => toggleTaskCompletion(task.id)}
    >
      {task.text}
    </button>
    <h1>{task.title}</h1>
    </>

  );
};

export default TaskItem;
