// src/App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import { Box, Toolbar } from '@mui/material';
import NavBar from './components/NavBar';
import Report from './pages/Report';
function App() {
  const userRole = "supervisor";
  return (
    <Router>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <SideNav userRole={userRole} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
            <Route path="/reports" element={<Report userRole={userRole} />} />
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
