import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Admin/Login";
import Register from "./Admin/Register";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/Inventory";
import AdminInfo from "./Pages/AdminInfo";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {/* <Inventory /> */}
      {/* <Dashboard /> */}
      {/* < AdminInfo /> */}
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/inventory"
            element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin-info"
            element={isAuthenticated ? <AdminInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
