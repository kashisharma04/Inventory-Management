import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const ProductTable = ({ products, updateProductsList, token }) => {
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/storage", {
          method: "POST",
          headers: { "x-header-key": token },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        updateProductsList(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token, updateProductsList]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/storage/${id}`, {
        method: "DELETE",
        headers: { "x-header-key": token },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      updateProductsList(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(currentProduct).forEach((key) => {
        formData.append(key, currentProduct[key]);
      });

      const response = await fetch(`http://localhost:8080/storage/${currentProduct._id}`, {
        method: "PUT",
        headers: {
          "x-header-key": token,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      updateProductsList(products.map((prod) => (prod._id === data.data._id ? data.data : prod)));
      setShow(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCurrentProduct({ ...currentProduct, [name]: files[0] });
    } else {
      setCurrentProduct({ ...currentProduct, [name]: value });
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Purchase Date</th>
            <th>Warranty</th>
            <th>Min Stock Level</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{new Date(product.purchaseDate).toLocaleDateString()}</td>
              <td>{product.warrantyCheck}</td>
              <td>{product.minimumStockLevel}</td>
              <td>
                {product.image && (
                  <img
                    src={`http://localhost:8080/uploads/${product.image}`}
                    alt={product.productName}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={currentProduct.productName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={currentProduct.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  name="purchaseDate"
                  value={currentProduct.purchaseDate.split("T")[0]}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Warranty Time</Form.Label>
                <Form.Control
                  type="text"
                  name="warrantyCheck"
                  value={currentProduct.warrantyCheck}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Stock Level</Form.Label>
                <Form.Control
                  type="number"
                  name="minimumStockLevel"
                  value={currentProduct.minimumStockLevel}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
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

export default ProductTable;
