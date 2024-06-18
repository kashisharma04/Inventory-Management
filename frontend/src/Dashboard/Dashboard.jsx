import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './SideBar';
import Categories from './Categories';
import LowStock from './LowStock';
import TotalProducts from './TotalProducts';
import ProductTable from './ProductTable';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="bg-light">
          <Sidebar />
        </Col>
        <Col xs={10}>
          <Row className="my-4">
            <Col>
              <Categories />
            </Col>
            <Col>
              <LowStock />
            </Col>
            <Col>
              <TotalProducts />
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <ProductTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
