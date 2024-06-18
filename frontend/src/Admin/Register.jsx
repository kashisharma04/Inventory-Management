import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = () => {
  const [admin, setAdmin] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/admin', admin);
      navigate('/login');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return <AuthForm type="register" handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default Register;
