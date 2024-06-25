import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminTable = ({ adminData }) => {
  const [show, setShow] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/${id}`);
      window.location.reload(); // Reload the page after deleting the admin
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleEdit = (admin) => {
    setCurrentAdmin(admin);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/admin/${currentAdmin._id}`, currentAdmin);
      window.location.reload(); // Reload the page after updating the admin
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin({ ...currentAdmin, [name]: value });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map((admin, index) => (
            <tr key={admin._id}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.mobile}</td>
              <td>{admin.designation}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(admin)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(admin._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentAdmin && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentAdmin.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentAdmin.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={currentAdmin.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={currentAdmin.designation}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminTable;
