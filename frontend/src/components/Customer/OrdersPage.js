import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrdersByCustomer, cancelOrder } from "../../api/customerApi";

export default function OrdersPage() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.uid;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const loadOrders = () => {
    if (!userId) return;
    setLoading(true);
    fetchOrdersByCustomer(userId)
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to fetch orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, [userId]);

  const handleCancel = (oid) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setCancellingId(oid);
      cancelOrder(oid)
        .then(() => {
          alert("Order cancelled successfully");
          loadOrders();
        })
        .catch(() => alert("Failed to cancel order"))
        .finally(() => setCancellingId(null));
    }
  };

  if (!userId) {
    return (
      <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
        <h2 style={{ textAlign: "center" }}>Please login to view your orders.</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Your Orders</h2>

      {loading && <p>Loading orders...</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {orders.map((order) => (
          <div
            key={order.oid}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 20,
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                flexWrap: "wrap",
              }}
            >
              <div>
                <strong>Order ID:</strong> {order.oid} <br />
                <strong>Status:</strong>{" "}
                {order.status ? order.status : "Pending"} <br />
                <strong>Order Date:</strong> {order.odate}
              </div>
              <div style={{ textAlign: "right" }}>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </div>
            </div>

            <div>
              <strong>Order Details:</strong>
              <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                {order.orderDetails.length > 0 ? (
                  order.orderDetails.map((od) => (
                    <li key={od.odid} style={{ marginBottom: 4 }}>
                      {od.productSeller.pid.pname} - Qty: {od.quantity} - ₹{od.amt}
                    </li>
                  ))
                ) : (
                  <li>No items</li>
                )}
              </ul>
            </div>

            <div style={{ marginTop: 15, textAlign: "right" }}>
              {order.status !== "Cancelled" ? (
                <button
                  onClick={() => handleCancel(order.oid)}
                  disabled={cancellingId === order.oid}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "8px 16px",
                    fontSize: 16,
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(220,53,69,0.3)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c82333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc3545")
                  }
                >
                  {cancellingId === order.oid ? "Cancelling..." : "Cancel Order"}
                </button>
              ) : (
                <span
                  style={{
                    color: "#6c757d",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Cancelled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
