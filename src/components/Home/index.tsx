'use client';

import React from 'react';
import Task from './Task';
import { Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Task />
    </Container>
  );
};

export default Home;
