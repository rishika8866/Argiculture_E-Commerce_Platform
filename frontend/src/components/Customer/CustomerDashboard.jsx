// // src/components/customer/CustomerDashboard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function CustomerDashboard() {
//   const navigate = useNavigate();

//   const cardStyle = {
//     flex: "1 1 250px",
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     padding: "24px",
//     textAlign: "center",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//     cursor: "pointer",
//   };

//   const handleMouseEnter = (e) => {
//     e.currentTarget.style.transform = "translateY(-4px)";
//     e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
//   };

//   const handleMouseLeave = (e) => {
//     e.currentTarget.style.transform = "translateY(0)";
//     e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
//   };

//   return (
//     <div style={{ maxWidth: 1100, margin: "auto", padding: "30px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Customer Dashboard</h2>

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "20px",
//           justifyContent: "center",
//         }}
//       >
//         {/* My Orders Card */}
//         <div
//           style={cardStyle}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={() => navigate("/customer/orders")}
//         >
//           <h3 style={{ marginBottom: "12px", color: "#007bff" }}>My Orders</h3>
//           <p style={{ color: "#555" }}>
//             View your complete order history and track current orders.
//           </p>
//         </div>

//         {/* Place Order Card */}
//         <div
//           style={cardStyle}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={() => navigate("/customer/place-order")}
//         >
//           <h3 style={{ marginBottom: "12px", color: "#28a745" }}>Place Order</h3>
//           <p style={{ color: "#555" }}>
//             Select products and place a new order quickly.
//           </p>
//         </div>

//         {/* Products Page Card */}
//         <div
//           style={cardStyle}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={() => navigate("/customer/products")}
//         >
//           <h3 style={{ marginBottom: "12px", color: "#ffc107" }}>Products</h3>
//           <p style={{ color: "#555" }}>
//             Browse and search for products from farmers.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    flex: "1 1 250px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "24px",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  };

  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Customer Dashboard</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {/* My Orders Card */}
        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/customer/orders")}
        >
          <h3 style={{ marginBottom: "12px", color: "#007bff" }}>My Orders</h3>
          <p style={{ color: "#555" }}>
            View your complete order history and track current orders.
          </p>
        </div>

        {/* Place Order Card */}
        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/customer/place-order")}
        >
          <h3 style={{ marginBottom: "12px", color: "#28a745" }}>Place Order</h3>
          <p style={{ color: "#555" }}>
            Select products and place a new order quickly.
          </p>
        </div>

        {/* Products Page Card */}
        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/customer/products")}
        >
          <h3 style={{ marginBottom: "12px", color: "#ffc107" }}>Products</h3>
          <p style={{ color: "#555" }}>
            Browse and search for products from farmers.
          </p>
        </div>

        {/* Profile Card */}
        <div
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/profile")}
        >
          <h3 style={{ marginBottom: "12px", color: "#17a2b8" }}>Profile</h3>
          <p style={{ color: "#555" }}>
            View and update your personal profile information.
          </p>
        </div>
      </div>
    </div>
  );
}
