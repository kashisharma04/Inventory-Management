import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { MdOutlineAddReaction } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PiList } from "react-icons/pi";
import "../../assests/Dashboard.css";
// import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { TiArrowUnsorted } from "react-icons/ti";

import 'react-notifications/lib/notifications.css';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';

const UserTable = ({ userData, fetchUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [editedData, setEditedData] = useState({});
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(`http://localhost:8080/user/${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        fetchUsers(userData.filter((user) => user._id !== id));
      } else {
        console.error("Failed to delete user:", response.data.message);
      }
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedData(user);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSaveChanges = async () => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/user/${selectedUser._id}`,
        editedData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === true) {
        fetchUsers(
          userData.map((user) =>
            user._id === selectedUser._id ? editedData : user
          )
        );
      } else {
        console.error("Failed to update user:", response.data.message);
      }

      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "pending":
        return "status-pending";
      case "returned":
        return "status-returned";
      default:
        return "";
    }
  };

  return (
    <>
      <Table striped bordered hover className="admin-table">
        <thead>
          <tr>
            <th>
              <PiList size={20} />
            </th>
            <th>Name <TiArrowUnsorted /></th>
            <th>Email <TiArrowUnsorted /></th>
            <th>Mobile <TiArrowUnsorted /></th>
            <th>Component <TiArrowUnsorted /></th>
            <th>Quantity <TiArrowUnsorted /></th>
            <th>Issued At <TiArrowUnsorted /></th>
            {/* <th>Return Date <TiArrowUnsorted /></th> */}
            <th>Status <TiArrowUnsorted /></th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.componentname}</td>
              <td>{user.quantity}</td>
              <td>{new Date(user.issuedAt).toLocaleString()}</td>
              {/* <td>{new Date(user.returnDate).toLocaleString()}</td> */}
              <td className={getStatusClassName(user.status)}>{(user.status)}</td>
              <td>
                <Button
                  className="button-add-product"
                  onClick={() => handleEdit(user)}
              
                >
                  <MdOutlineAddReaction size={25} />
                </Button>
                <Button
                  className="button-add-product1"
                  onClick={() => handleDelete(user._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} size="lg"  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={editedData.mobile }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formComponentName">
              <Form.Label>Component Name</Form.Label>
              <Form.Control
                type="text"
                name="componentname"
                value={editedData.componentname }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={editedData.quantity }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={editedData.status}
                onChange={handleChange}
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
          <Button className="cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="save" onClick={handleSaveChanges}>
              Save
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
