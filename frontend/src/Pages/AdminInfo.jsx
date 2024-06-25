import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  Nav,
  Navbar,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../assests/Dashboard.css"; // Import the new CSS file
import AdminTable from '../Admin/AdminTable'

const AdminInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin");
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar p-3">
      <Navbar.Brand as={Link} to="/">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
            <Nav.Link as={Link} to="/user-track">User-Track</Nav.Link>
            <Nav.Link as={Link} to="/admin-info">Admin-info</Nav.Link>
          </Nav>
        </Navbar.Brand>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <Navbar className="d-flex justify-content-end" bg="light" expand="lg">
            <Navbar.Brand href="/admin-info">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i className="fas fa-caret-down fa-lg" style={{ fontSize: "20px" }}>
                    <CgProfile />
                  </i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
          </Navbar>
        </header>

        <Container fluid className="flex-grow-1">
          <Row className="mb-3">
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Categories</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Products</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Low Stock</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Out of Stock</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Admin Table</Card.Title>
                  <div className="table">
                    <AdminTable adminData={adminData} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminInfo;
