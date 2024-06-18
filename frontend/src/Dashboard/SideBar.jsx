import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/" className="flex-column">
      <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/admin">User Tracking</Nav.Link>
      <Nav.Link as={Link} to="/admin/inventory">Inventory</Nav.Link>
      <Nav.Link as={Link} to="/admin/authentication">User Authentication</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
