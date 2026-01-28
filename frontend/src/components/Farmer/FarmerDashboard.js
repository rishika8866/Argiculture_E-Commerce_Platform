// import React from "react";
// import { Link } from "react-router-dom";

// const FarmerDashboard = ({ uid }) => {
//   return (
//     <div className="container text-center">
//       <h2 className="my-4">Farmer Dashboard</h2>
//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <Link to="/farmer/add-product" className="btn btn-success btn-lg w-100">
//             Add Product
//           </Link>
//         </div>
//         <div className="col-md-6 mb-4">
//           <Link to="/farmer/products" className="btn btn-primary btn-lg w-100">
//             View My Products
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;





// //////////////////////////////////update 1///////////////
// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const FarmerDashboard = () => {
//   const user = useSelector((state) => state.auth.user);
//   const farmerName = user?.name || "Farmer";
//   const farmerId = user?.uid; // can be used to fetch farmer-specific data

//   return (
//     <div className="container text-center">
//       <h2 className="my-4">Welcome, {farmerName}</h2>
//       <p className="text-muted">Farmer ID: {farmerId}</p>

//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <Link
//             to="/farmer/add-product"
//             className="btn btn-success btn-lg w-100"
//           >
//             Add Product
//           </Link>
//         </div>
//         <div className="col-md-6 mb-4">
//           <Link
//             to="/farmer/products"
//             className="btn btn-primary btn-lg w-100"
//           >
//             View My Products
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;

// //////////////////////////////////


import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FarmerDashboard = () => {
  const user = useSelector((state) => state.auth.user);
const farmerName = user?.uname || "Farmer";  // changed here
const farmerId = user?.uid || "-";  

  // Card style for all three
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 180,
    transition: "box-shadow 0.3s ease",
  };

  const cardHoverStyle = {
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  };

  // Local state to handle hover effect (optional)
  const [hovered, setHovered] = React.useState(null);

  return (
    <div className="container text-center">
      <h2 className="my-4">Welcome, {farmerName}</h2>
      <p className="text-muted">Farmer ID: {farmerId}</p>

      <div className="row" style={{ gap: 20, justifyContent: "center" }}>
        {[
          {
            path: "/farmer/add-product",
            label: "Add Product",
            icon: "➕",
            key: "add-product",
          },
          {
            path: "/farmer/products",
            label: "View My Products",
            icon: "📦",
            key: "my-products",
          },
          {
            path: "/farmer/profile",
            label: "Profile",
            icon: "👤",
            key: "profile",
          },
        ].map(({ path, label, icon, key }) => (
          <Link
            to={path}
            key={key}
            style={{
              ...cardStyle,
              ...(hovered === key ? cardHoverStyle : {}),
              flex: "0 0 250px",
            }}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontSize: 20, fontWeight: "600" }}>{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
