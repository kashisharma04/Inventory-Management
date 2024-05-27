import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin', {
        name,
        email,
        password,
        createdAt,
        updatedAt,
      });
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  return (
    <div>
      <h1>Create Admin</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          CreatedAt:
          <input
            type="datetime-local"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </label>
        <label>
          UpdatedAt:
          <input
            type="datetime-local"
            value={updatedAt}
            onChange={(e) => setUpdatedAt(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;