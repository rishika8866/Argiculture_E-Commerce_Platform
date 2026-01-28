import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/adminApi";
import { Table, Spinner, Card } from "react-bootstrap";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Products & Sellers</Card.Header>
      <Card.Body>
        {products.map(p => (
          <Card className="mb-3" key={p.pid}>
            <Card.Body>
              <Card.Title>{p.pname} <small className="text-muted">(Category: {p.category})</small></Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Seller ID</th>
                    <th>Seller Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Available</th>
                  </tr>
                </thead>
                <tbody>
                  {p.sellers.map(s => (
                    <tr key={s.psId}>
                      <td>{s.sellerId}</td>
                      <td>{s.sellerName}</td>
                      <td>{s.price}</td>
                      <td>{s.qty}</td>
                      <td>{s.available ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
};

export default ProductsList;
