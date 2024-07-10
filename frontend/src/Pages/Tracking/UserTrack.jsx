import React, { useState, useEffect } from "react";
import { HiUsers } from "react-icons/hi2";
import { MdSpaceDashboard, MdInventory } from "react-icons/md";
import { BiSolidUserAccount, BiSolidMessageSquareAdd } from "react-icons/bi";
import { RiHomeSmileFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import "react-notifications/lib/notifications.css";
import { format, parseISO } from "date-fns";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Button,
  Modal,
  Form,
  Nav,
  InputGroup,
  Dropdown
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assests/Dashboard.css";
import UserTable from "./UserTable";

const UserTrack = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [componentname, setComponentName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [issuedAt, setIssuedAt] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();
  const adminId = localStorage.getItem("adminId");

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/user", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/dashboard");
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const formData = {
        name,
        email,
        mobile,
        quantity,
        issuedAt,
        componentname,
        returnDate,
        status,
        adminId,
      };

      const response = await axios.post(
        "http://localhost:8080/user",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(response.data); // Handle success response here
      setShowModal(false);
      fetchUsers(); // Refresh user data after adding a new product
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredUsers = userData.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? user.status === filterStatus : true)
    );
  });

  // const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar p-3">
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/dashboard">
            <MdSpaceDashboard /> Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/inventory">
            <MdInventory /> Inventory
          </Nav.Link>
          <Nav.Link as={Link} to="/user-track">
            <BiSolidUserAccount /> Tracking
          </Nav.Link>
          <Nav.Link as={Link} to="/admin-info">
            <HiUsers /> User Authentication
          </Nav.Link>
        </Nav>
        <Nav.Link onClick={handleLogout} className="text-danger mt-auto">
          <Button className="button-add-product2">
            <RiHomeSmileFill size={25} />
          </Button>
        </Nav.Link>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/*  <Navbar className="d-flex justify-content-end" bg="light" expand="lg">
             <Button
              onClick={() => setShowModal(true)}
              className="button-add-product"
            >
              <BiSolidMessageSquareAdd size={20}/> Add User
            </Button> 
          </Navbar>*/}
          <header>
          <Navbar className="d-flex justify-content-end" bg="light" expand="lg">
            <Navbar.Brand href="#home">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i
                    className="fas fa-caret-down fa-lg"
                    style={{ fontSize: "20px" }}
                  >
                    <CgProfile />
                  </i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='/dashboard' >View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}><MdLogout /> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
          </Navbar>
        </header>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Fill User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMobile">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formComponentName">
                <Form.Label>Component Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter component name"
                  value={componentname}
                  onChange={(e) => setComponentName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formIssue">
                <Form.Label>Issue Date</Form.Label>
                <Form.Control
                  type="date"
                  value={issuedAt}
                  onChange={(e) => setIssuedAt(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formReturnDate">
                <Form.Label>Return Date</Form.Label>
                <Form.Control
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="returned">Returned</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button className="save" onClick={handleAddProduct}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Container fluid className="flex-grow-1">
          <Row className="mb-3">
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Most issued item</Card.Title>
                  <Card.Text style={{ color: '#f77f5b' }}>Total (20 items)</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Top users</Card.Title>
                  <Card.Text style={{ color: '#f77f5b' }}>Total (20 items)</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Component 3</Card.Title>
                  <Card.Text style={{ color: '#f77f5b' }}>Total (20 items)</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Component 4</Card.Title>
                  <Card.Text style={{ color: '#f77f5b' }}>Total (20 items)</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* New Row for Search and Filter */}
          <Row className="mb-3">
            <Col xs={4}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Type here to search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <InputGroup.Text>
                  <CiSearch />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={4}>
              <Form.Control
                as="select"
                value={filterStatus}
                onChange={handleFilterChange}
              >
                <option value="">Filter by status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="returned">Returned</option>
              </Form.Control>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
            <Button
                      onClick={() => setShowModal(true)}
                      className="button-add-product"
                    >
                      <BiSolidMessageSquareAdd size={20} /> Add
                    </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>User Details</Card.Title>
                  <div className="table-container">
                    {/* <Button
                      onClick={() => setShowModal(true)}
                      className="button-add-product"
                    >
                      <BiSolidMessageSquareAdd size={20} /> Add User
                    </Button> */}
                    <UserTable
                      userData={filteredUsers}
                      fetchUsers={fetchUsers}
                    />
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

export default UserTrack;
