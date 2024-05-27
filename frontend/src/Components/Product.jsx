import React, { useState } from 'react';
import axios from 'axios';

const Product = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [addedAt, setAddedAt] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [adminId, setAdminId] = useState('');

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('addedAt', addedAt);
    formData.append('expiryDate', expiryDate);
    formData.append('updatedAt', updatedAt);
    formData.append('adminId', adminId);

    try {
      const { data } = await axios.post('/api/products', formData);
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleGetProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleGetProductById = async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setSelectedProduct(data);
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleUpdateProduct = async (id) => {
    const updateData = {
      productName,
      category,
      description,
      image,
      quantity,
      price,
      addedAt,
      expiryDate,
      updatedAt,
      adminId,
    };
    try {
      const { data } = await axios.put(`/api/products/${id}`, updateData);
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      console.log(data);
      // handle successful response here
    } catch (error) {
      console.error(error);
      // handle error response here
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Added At:
          <input
            type="datetime-local"
            value={addedAt}
            onChange={(e) => setAddedAt(e.target.value)}
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="datetime-local"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>
        <label>
          Updated At:
          <input
            type="datetime-local"
            value={updatedAt}
            onChange={(e) => setUpdatedAt(e.target.value)}
          />
        </label>
        <label>
Admin Id:
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleGetProducts}>Get Products</button>
      {selectedProduct && (
        <div>
          <h2>Selected Product</h2>
          <p>Product Name: {selectedProduct.productName}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>Image: {selectedProduct.image}</p>
          <p>Quantity: {selectedProduct.quantity}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>Added At: {selectedProduct.addedAt}</p>
          <p>Expiry Date: {selectedProduct.expiryDate}</p>
          <p>Updated At: {selectedProduct.updatedAt}</p>
          <p>Admin Id: {selectedProduct.adminId}</p>
          <button onClick={() => handleUpdateProduct(selectedProduct._id)}>
            Update Product
          </button>
          <button onClick={() => handleDeleteProduct(selectedProduct._id)}>
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;