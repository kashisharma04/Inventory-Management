// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './Dashboard/Dashboard';
// import Login from './Admin/Login';
// import Register from './Admin/Register';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
//         <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
// import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Router from './Router';
import NavBar from '../src/Dashboard/SideBar';
// import Footer from './Footer';
import {
  isLoggedIn,
  loginAnonymous,
  loginWithKey,
  logoutUser,
} from ""
import Login from "./Login"

export const history = createBrowserHistory();

export default App = () => { 
  {
    return isLoggedIn() ? (
      <>
        <NavBar handleLogout={logoutUser} isLoggedIn={isLoggedIn} /><br />
        <Router history={history} />
        <Footer />
      </>
    ) : (
      <>
        <NavBar handleLogout={logoutUser} isLoggedIn={isLoggedIn} />
        <br />
        <Login loginAnonymous={loginAnonymous} loginWithKey={loginWithKey} />
        <Footer />
      </>
    );
  }
}
