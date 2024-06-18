import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/login', credentials);
      localStorage.setItem('token', response.data.data.token);
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return <AuthForm type="login" handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default Login;
