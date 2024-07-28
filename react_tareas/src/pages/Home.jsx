import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{
      backgroundColor: '#e3f2fd',
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
      borderRadius: 4,
    }}>
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 4,
          marginTop: 5,
          padding: 3,
          backgroundColor: "#7986cb",
          color: 'white',
          borderRadius: 4,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Task Manager
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Start by adding any task below
        </Typography>
      </Box>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: '#ce93d8',
          boxShadow: 3,
          borderRadius: 4,
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <TaskForm />
        </Box>
        <TaskList />
      </Paper>
    </Container>
  );
};

export default Home;
