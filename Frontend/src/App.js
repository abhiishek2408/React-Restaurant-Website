import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';
import Login from './authuntication/Login';
import Signup from './authuntication/Signup';
import { UserProvider } from "./UseContext"; // Import UserProvider
import './App.css'
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Redirect from root to /user */}
            <Route path="/" element={<UserDashboard/>} />
            {/* <Route path="/user" element={<UserDashboard/>} /> */}
            <Route path="/user/*" element={<UserDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/*" element={<AdminDashboard />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;