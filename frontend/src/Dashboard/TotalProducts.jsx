import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import api from '../service/services';
import 'bootstrap/dist/css/bootstrap.min.css';

const TotalProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/storage');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(product._id);
    setCurrentProduct(product);
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/storage/${id}`, currentProduct);
      setIsEditing(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Total Products</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  {isEditing === product._id ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleChange}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {isEditing === product._id ? (
                    <Form.Control
                      type="text"
                      name="category"
                      value={currentProduct.category}
                      onChange={handleChange}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {isEditing === product._id ? (
                    <Form.Control
                      type="number"
                      name="stock"
                      value={currentProduct.stock}
                      onChange={handleChange}
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td>
                  {isEditing === product._id ? (
                    <Button variant="success" onClick={() => handleSave(product._id)}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleEdit(product)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TotalProducts;
