import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AuthForm = ({ type, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      {type === 'register' && (
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} />
        </Form.Group>
      )}
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
    </Form>
  );
};

export default AuthForm;
