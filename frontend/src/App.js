// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';


// import NavBar from './components/Navbar';
// import Home from './pages/Home';
// import Footer from './components/footer';
// import Login from './pages/Login';
// import Register from './components/Register';
// import Logout from './components/logout';

// //this is of farmers
// import FarmerDashboard from './components/Farmer/FarmerDashboard';
// import AddProduct from './components/Farmer/AddProduct';
// import FarmerProductList from './components/Farmer/FarmerProductList';

// //this is of customer
// import OrdersPage from './components/Customer/OrdersPage';
// import ProductsPage from './components/Customer/ProductsPage'; 
// import PlaceOrderPage from './components/Customer/PlaceOrderPage';

// //this is of admin
// import AdminDashboard from "./pages/AdminDashboard";



//   // <-- added

// // import AdminDashboard from './pages/AdminDashboard'; // Add this when admin is ready

// function App() {
//   const user = useSelector((state) => state.auth.user);
//   console.log("Logged in user:", user);

//   const getRedirectPath = () => {
//     if (!user) return '/login';
//     const roleId = user?.role?.rid;

//     if (roleId === 1) return '/customer/products'; // Customer
//     if (roleId === 2) return '/farmer/dashboard'; // Farmer
//     if (roleId === 3) return '/admin/dashboard'; // Admin
//     return '/';
//   };

//   return (
//     <Router>
//       <NavBar />
//       <div className="container mt-5 pt-4">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/logout" element={<Logout />} />

//           {/* Redirect based on role after login */}
//           <Route path="/redirect" element={<Navigate to={getRedirectPath()} />} />

//           {/* Customer Routes */}
//         <Route path="/customer/products" element={<ProductsPage />} />
//           <Route path="/customer/orders" element={<OrdersPage />} />
//           <Route path="/customer/place-order" element={<PlaceOrderPage />} />

//           {/* Farmer Routes */}
//           <Route path="/farmer/dashboard" element={<FarmerDashboard uid={user?.uid} />} />
//           <Route path="/farmer/add-product" element={<AddProduct />} />
//           <Route path="/farmer/products" element={<FarmerProductList />} />

//           {/* Admin Routes (uncomment when ready) */}


//           <Route path="/admin/dashboard" element={<AdminDashboard />} />




//           {/* 404 fallback could go here if needed */}
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

////////////////////////////////

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./components/Register";
import CustomerDashboard from "./components/Customer/CustomerDashboard";
import ProductsPage from "./components/Customer/ProductsPage";
import OrdersPage from "./components/Customer/OrdersPage";
import PlaceOrderPage from "./components/Customer/PlaceOrderPage";
import FarmerDashboard from "./components/Farmer/FarmerDashboard";
import AddProduct from "./components/Farmer/AddProduct";
import FarmerProductList from "./components/Farmer/FarmerProductList";
import ProfilePage from "./pages/ProfilePage";  // <-- Import ProfilePage here
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// function MainLayout() {
//   const location = useLocation();
//   const user = useSelector((state) => state.auth.user);

//   // Hide navbar on login/register
//   const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

//   // Decide where to send user after login
//   const getRedirectPath = () => {
//     if (!user) return "/login";
//     const roleId = user?.role?.rid;
//     if (roleId === 1) return "/customer/dashboard"; // Customer
//     if (roleId === 2) return "/farmer/dashboard"; // Farmer
//     if (roleId === 3) return "/admin/dashboard"; // Admin
//     return "/";
//   };

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Redirect after login */}
//         <Route path="/redirect" element={<Navigate to={getRedirectPath()} />} />

//         {/* Customer */}
// <Route path="/customer/dashboard" element={<CustomerDashboard />} />
// <Route path="/customer/products" element={<ProductsPage />} />
// <Route path="/customer/orders" element={<OrdersPage />} />
// <Route path="/customer/place-order" element={<PlaceOrderPage />} />

// {/* Common profile route for all roles */}
// <Route path="/profile" element={<ProfilePage />} />

// {/* Farmer */}
// <Route path="/farmer/dashboard" element={<FarmerDashboard uid={user?.uid} />} />
// <Route path="/farmer/add-product" element={<AddProduct />} />
// <Route path="/farmer/products" element={<FarmerProductList />} />
// <Route path="/farmer/profile" element={<ProfilePage />} />  {/* Optional if you want /farmer/profile */}

// {/* Admin */}
// <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </>
//   );
// }
function MainLayout() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  // Hide navbar on login/register
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  // Decide where to send user after login
  const getRedirectPath = () => {
    if (!user) return "/login";
    const roleId = user?.role?.rid;
    if (roleId === 1) return "/customer/dashboard"; // Customer
    if (roleId === 2) return "/farmer/dashboard"; // Farmer
    if (roleId === 3) return "/admin/dashboard"; // Admin
    return "/";
  };

  return (
    <>
      {!hideNavbar && <Navbar />}
      {/* Add paddingTop to avoid content hiding under fixed navbar */}
      <div style={{ paddingTop: hideNavbar ? 0 : "70px" }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect after login */}
          <Route path="/redirect" element={<Navigate to={getRedirectPath()} />} />

          {/* Customer */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/products" element={<ProductsPage />} />
          <Route path="/customer/orders" element={<OrdersPage />} />
          <Route path="/customer/place-order" element={<PlaceOrderPage />} />

          {/* Common profile route for all roles */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Farmer */}
          <Route path="/farmer/dashboard" element={<FarmerDashboard uid={user?.uid} />} />
          <Route path="/farmer/add-product" element={<AddProduct />} />
          <Route path="/farmer/products" element={<FarmerProductList />} />
          <Route path="/farmer/profile" element={<ProfilePage />} />

          <Route path="/about" element={<About />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
}
export default App;