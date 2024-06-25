import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Nav, Navbar, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assests/Dashboard.css";
import ProductTable from './ProductTable';

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [minimumStockLevel, setMinimumStockLevel] = useState("");
  const [warrantyCheck, setWarrantyCheck] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/storage", {
        method: "GET",
        headers: {
          "x-header-key": token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateProductsList = async () => {
    try {
      const response = await fetch("http://localhost:8080/storage", {
        method: "GET",
        headers: {
          "x-header-key": token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error updating products list:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("purchaseDate", purchaseDate);
      formData.append("warrantyCheck", warrantyCheck);
      formData.append("minimumStockLevel", minimumStockLevel);
      formData.append("image", image);

      const response = await fetch("http://localhost:8080/storage", {
        method: "POST",
        headers: {
          "x-header-key": token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Handle success response here
      setShowModal(false);
      updateProductsList(); // Update the products list after adding a new product
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

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
            <Button onClick={() => setShowModal(true)} className="button-add-product">
              + Add Product
            </Button>
          </Navbar>
        </header>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPurchaseDate">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formWarrantyCheck">
                <Form.Label>Warranty Time</Form.Label>
                <Form.Control
                  type="String"
                  placeholder="Enter Warranty Timeline"
                  value={warrantyCheck}
                  onChange={(e) => setWarrantyCheck(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formMinimumStockLevel">
                <Form.Label>Minimum Stock Level</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter maximum stock level"
                  value={minimumStockLevel}
                  onChange={(e) => setMinimumStockLevel(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>

        <Container fluid className="flex-grow-1">
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Table</Card.Title>
                  <div className="table">
                    <ProductTable
                      products={products}
                      updateProductsList={updateProductsList}
                      token={token}
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

export default Inventory;
