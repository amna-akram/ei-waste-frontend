import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SideNav from './components/SideNav';
import { Box, Toolbar } from '@mui/material';
import NavBar from './components/NavBar';
import Report from './pages/Report';
import Worker from './pages/Worker';


function AppWrapper() {
  const query = useQuery();
  const userRole = query.get('userRole') || "supervisor";
  const department = query.get('department') || "cooking";

  if (userRole === "worker") {
    return (
      <>
        <NavBar />
        <Worker />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <SideNav userRole={userRole} department={department} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Worker />} />
            <Route path="/dashboard" element={<Worker />} />
            <Route path="/reports" element={<Report userRole={userRole} department={department} />} />
            <Route path="/team" element={<div>Team Content</div>} />
            <Route path="/tasks" element={<div>Tasks Content</div>} />
            <Route path="/users" element={<div>User Management Content</div>} />
            <Route path="/settings" element={<div>Settings Content</div>} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

// Custom hook to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
