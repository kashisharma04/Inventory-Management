import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAdmin = () => {
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await axios.get(`http://localhost:8080/admin/${id}`);
      setAdmin(response.data.data);
    };
    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`/admin/${id}`, admin, {
      headers: {
        'x-header-key': token,
      },
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Admin</h2>
      <input type="text" name="name" value={admin.name} onChange={handleChange} />
      <input type="email" name="email" value={admin.email} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditAdmin;
