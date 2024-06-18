// src/components/LowStock.js
import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LowStock = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Low Stock</Card.Title>
        <Card.Text>
          Products with low stock will be displayed here.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LowStock;
