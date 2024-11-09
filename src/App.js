// src/App.js

import React from 'react';
import './App.css';
import ExampleGraphs from './components/ExampleGraphs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import { Box, Toolbar } from '@mui/material';
import NavBar from './components/NavBar';

function App() {
  const userRole = "manager";
  return (
    <Router>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <SideNav userRole={userRole} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
            <Route path="/reports" element={<div>Reports Content</div>} />
            <Route path="/team" element={<div>Team Content</div>} />
            <Route path="/tasks" element={<div>Tasks Content</div>} />
            <Route path="/users" element={<div>User Management Content</div>} />
            <Route path="/settings" element={<div>Settings Content</div>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
