import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return; // Prevent adding empty tasks
    addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField sx={{
          whiteSpace: 'nowrap', backgroundColor: 'white', borderRadius: 5, '& fieldset': {
            border: 'none',
          },
        }}
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new task"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            whiteSpace: 'nowrap',
            padding: 1.3,
            backgroundColor: '#5e35b1',
            borderRadius: 5,
            transition: 'background-color 0.3s ease', '&:hover': {
              backgroundColor: '#673ab7',
            },
          }}
        >
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
