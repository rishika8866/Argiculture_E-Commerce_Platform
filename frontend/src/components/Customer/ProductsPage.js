import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/customerApi";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
      // Filter out null products from response data
      const filteredProducts = res.data.filter(p => p !== null);

      // Filter unique products by pid to avoid duplicates
      const uniqueProductsMap = new Map();
      filteredProducts.forEach((p) => {
        if (!uniqueProductsMap.has(p.pid)) {
          uniqueProductsMap.set(p.pid, p);
        }
      });

      setProducts(Array.from(uniqueProductsMap.values()));
    })
    .catch(() => alert("Failed to load products"));
}, []);


  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p.pid}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 140,
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{p.pname}</h3>
              <p style={{ margin: 0, color: "#555", fontSize: 16 }}>
                Category: <strong>{p.catId?.catName}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button
          onClick={() => navigate("/customer/place-order")}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "12px 28px",
            fontSize: 18,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,123,255,0.3)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Go to Shopping
        </button>
      </div>
    </div>
  );
}
