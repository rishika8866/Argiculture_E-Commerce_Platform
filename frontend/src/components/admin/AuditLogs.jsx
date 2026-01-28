import React, { useEffect, useState } from "react";
import { getAuditLogs } from "../../api/adminApi";
import { Table, Spinner, Card, Form, Button, Row, Col } from "react-bootstrap";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ actionType: "", tableName: "" });
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    setLoading(true);
    getAuditLogs(filters)
      .then(res => setLogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDownloadCsv = () => {
    const params = { ...filters, downloadCsv: true };
    const url = `http://localhost:8080/api/Admin/audit-logs?${new URLSearchParams(params)}`;
    window.open(url, "_blank");
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Audit Logs</Card.Header>
      <Card.Body>
        <Form className="mb-3">
          <Row className="g-2">
            <Col md={4}>
              <Form.Control
                placeholder="Action Type"
                value={filters.actionType}
                onChange={(e) => setFilters({ ...filters, actionType: e.target.value })}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Table Name"
                value={filters.tableName}
                onChange={(e) => setFilters({ ...filters, tableName: e.target.value })}
              />
            </Col>
            <Col md={4}>
              <Button variant="primary" className="me-2" onClick={fetchLogs}>Filter</Button>
              <Button variant="outline-secondary" onClick={handleDownloadCsv}>Download CSV</Button>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Action Type</th>
              <th>Table</th>
              <th>Record ID</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Action By</th>
              <th>Action Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.auditId}>
                <td>{l.auditId}</td>
                <td>{l.actionType}</td>
                <td>{l.tableName}</td>
                <td>{l.recordId}</td>
                <td>{l.oldValue}</td>
                <td>{l.newValue}</td>
                <td>{l.actionBy}</td>
                <td>{l.actionDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AuditLogs;
