import React, { useEffect, useState } from "react";
import { getCustomers } from "../../api/adminApi";
import { Table, Spinner, Card } from "react-bootstrap";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers()
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Customers</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Account No</th>
              <th>Address</th>
              <th>Role</th>
              <th>City ID</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.uid}>
                <td>{c.uid}</td>
                <td>{c.uname}</td>
                <td>{c.email}</td>
                <td>{c.contactNo}</td>
                <td>{c.accNo}</td>
                <td>{c.address}</td>
                <td>{c.role}</td>
                <td>{c.cityId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CustomersList;
