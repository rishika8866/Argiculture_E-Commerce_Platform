import React from "react";
import { Container } from "react-bootstrap";
import CustomersList from "../components/admin/CustomersList";
import FarmersList from "../components/admin/FarmersList";
import ProductsList from "../components/admin/ProductsList";
import AuditLogs from "../components/admin/AuditLogs";

const AdminDashboard = () => {
  return (
    <Container className="my-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <CustomersList />
      <FarmersList />
      <ProductsList />
      <AuditLogs />
    </Container>
  );
};

export default AdminDashboard;
