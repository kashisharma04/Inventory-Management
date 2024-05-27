import React, { useState } from 'react';
import axios from 'axios';

const User = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [componentname, setComponentname] = useState('');
  const [quantity, setQuantity] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, mobile, componentname, quantity, issuedAt, returnDate };

    try {
      const { data } = await axios.post('/api/users', userData);
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleGetUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleGetUserById = async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      setSelectedUser(data);
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleUpdateUser = async (id) => {
    const updateData = { name, email, mobile, componentname, quantity, issuedAt, returnDate };
    try {
      const { data } = await axios.put(`/api/users/${id}`, updateData);
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  return (
    <div>
      <h1>Create User</h1>
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
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>
        <label>
          Component Name:
          <input
            type="text"
            value={componentname}
            onChange={(e) => setComponentname(e.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Issued At:
          <input
            type="datetime-local"
            value={issuedAt}
            onChange={(e) => setIssuedAt(e.target.value)}
          />
        </label>
        <label>
          Return Date:
          <input
            type="datetime-local"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleGetUsers}>Get Users</button>
      {selectedUser && (
        <div>
          <h2>Selected User</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Mobile: {selectedUser.mobile}</p>
          <p>Component Name: {selectedUser.componentname}</p>
          <p>Quantity: {selectedUser.quantity}</p>
          <p>Issued At: {selectedUser.issuedAt}</p>
          <p>Return Date: {selectedUser.returnDate}</p>
          <button onClick={() => handleUpdateUser(selectedUser._id)}>
            Update User
          </button>
          <button onClick={() => handleDeleteUser(selectedUser._id)}>
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

export default User;