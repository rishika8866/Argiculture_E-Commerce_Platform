import React, { useEffect, useState } from "react";
import { getFarmers } from "../../api/adminApi";
import { Table, Spinner, Card } from "react-bootstrap";

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFarmers()
      .then(res => setFarmers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Farmers</Card.Header>
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
            {farmers.map(f => (
              <tr key={f.uid}>
                <td>{f.uid}</td>
                <td>{f.uname}</td>
                <td>{f.email}</td>
                <td>{f.contactNo}</td>
                <td>{f.accNo}</td>
                <td>{f.address}</td>
                <td>{f.role}</td>
                <td>{f.cityId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default FarmersList;
