import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Sidebar = () => {
  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
      activeKey="/home"
      onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    >
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link href="#inventory">Inventory</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#user-tracking">User-Tracking</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#admin-info">Admin-Info</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#orders">Orders</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
