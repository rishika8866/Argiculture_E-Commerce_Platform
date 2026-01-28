import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts, placeOrder, cancelOrder } from "../../api/customerApi";

export default function PlaceOrderPage() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.uid;

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // useEffect(() => {
  //   fetchProducts()
  //     .then((res) => {
  //       // Filter unique products by pid to avoid duplicates
  //       const uniqueProductsMap = new Map();
  //       res.data.forEach((p) => {
  //         if (!uniqueProductsMap.has(p.pid)) {
  //           uniqueProductsMap.set(p.pid, p);
  //         }
  //       });
  //       setProducts(Array.from(uniqueProductsMap.values()));
  //     })
  //     .catch(() => alert("Failed to load products"));
  // }, []);

useEffect(() => {
  fetchProducts()
    .then((res) => {
      console.log("Fetched products:", res.data);
      const uniqueProductsMap = new Map();
      res.data
  .filter(p => p != null && p.pid != null) // keep only non-null and pid defined
  .forEach((p) => {
    if (!uniqueProductsMap.has(p.pid)) {
      uniqueProductsMap.set(p.pid, p);
    }
  });
      setProducts(Array.from(uniqueProductsMap.values()));
    })
    .catch((err) => {
  console.error("Fetch products error:", err);
  alert("Failed to load products. See console for details.");
});
}, []);


  const handleQtyChange = (pid, value) => {
    const qty = Math.max(0, Number(value));
    setQuantities((prev) => ({ ...prev, [pid]: qty }));
  };

  const handlePlaceOrder = () => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([pid, qty]) => ({ pid: Number(pid), quantity: qty }));

    if (items.length === 0) {
      alert("Please enter quantity for at least one product.");
      return;
    }

    setLoading(true);
    placeOrder({ uid: userId, items })
      .then((res) => {
        setResponse(res.data);
        setQuantities({});
      })
      .catch(() => alert("Failed to place order"))
      .finally(() => setLoading(false));
  };

  const handleCancelOrder = () => {
    if (!response) return;
    const orderId = response.oid;

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setCancelling(true);
    cancelOrder(orderId)
      .then(() => {
        alert("Order cancelled successfully");
        // Update local response status to Cancelled
        setResponse((prev) => ({ ...prev, status: "Cancelled" }));
      })
      .catch(() => alert("Failed to cancel order"))
      .finally(() => setCancelling(false));
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Place Your Order</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.pid}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
  <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{p.pname}</h3>
  <p style={{ margin: 0, color: "#777", fontSize: 14 }}>
    Category: <strong>{p.catId?.catName}</strong>
  </p>
  <p style={{ margin: '4px 0', color: '#444', fontWeight: 'bold' }}>
    Price: ₹{p.price ?? 'N/A'}
  </p>
</div>

            <div style={{ marginTop: 16 }}>
              <label
                htmlFor={`qty-${p.pid}`}
                style={{ fontWeight: "bold", marginRight: 8 }}
              >
                Quantity:
              </label>
              <input
                id={`qty-${p.pid}`}
                type="number"
                min="0"
                value={quantities[p.pid] || ""}
                onChange={(e) => handleQtyChange(p.pid, e.target.value)}
                style={{
                  width: 70,
                  padding: "6px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  fontSize: 16,
                }}
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "12px 28px",
            fontSize: 18,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(40,167,69,0.3)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {response && (
        <div
          style={{
            marginTop: 50,
            padding: 24,
            borderRadius: 8,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            color: response.status === "Cancelled" ? "#856404" : "#155724",
            border:
              response.status === "Cancelled"
                ? "1px solid #ffeeba"
                : "1px solid #c3e6cb",
          }}
        >
          <h3>
            Order {response.status === "Cancelled" ? "Cancelled" : "Placed"}{" "}
            {response.status !== "Cancelled" && "🎉"}
          </h3>
          <p>
            <strong>Order ID:</strong> {response.oid}
          </p>
          <p>
            <strong>Status:</strong> {response.status}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{response.totalAmount}
          </p>
          <p>
            <strong>Order Date:</strong> {response.odate}
          </p>

          {/* Show Cancel Order button only if order is not cancelled */}
          {response.status !== "Cancelled" && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              style={{
                marginTop: 20,
                backgroundColor: "#dc3545",
                color: "#fff",
                padding: "10px 24px",
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
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
