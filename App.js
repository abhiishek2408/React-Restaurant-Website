import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './component/UserDashboard';
import AdminDashboard from './component/AdminDashboard';
import SeasonalMenu from './component/SeasonalMenu';
import Login from './component/Login';
import { UserProvider } from "./UseContext";  // Import UserProvider

function App() {
  return (
    <UserProvider>
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<UserDashboard />} /> 
          <Route path="/seasonalmenu" element={<SeasonalMenu />} />
        </Routes>

      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
