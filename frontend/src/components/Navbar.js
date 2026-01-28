// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("login"); // check if user is logged in

//   const handleLogout = () => {
//     localStorage.removeItem("login"); // remove JWT token
//     navigate("/"); // redirect to login page
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3 fixed-top">
//       <a className="navbar-brand" href="/">AgriMarket</a>


//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarContent">
//         {/* Left Navigation Links */}
//         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className="nav-item">
//             <a className="nav-link active" href="/">Home</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/about">About</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/contact">Contact</a>
//           </li>
//         </ul>

//         {/* Search Bar */}
//         <form className="d-flex me-3">
//           <input className="form-control me-2" type="search" placeholder="Search..." />
//           <button className="btn btn-outline-light" type="submit">Search</button>
//         </form>

//         {/* Right Navigation Links */}
 

//         {/* Auth Buttons */}
//         <div className="d-flex">
//           {!isLoggedIn ? (
//             <>
//               <a href="/register" className="btn btn-light me-2">Register</a>
//               <a href="/login" className="btn btn-outline-light">Login</a>
//             </>
//           ) : (
//             <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user); // ✅ from Redux
//   const isLoggedIn = !!user;

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3 fixed-top">
//       <a className="navbar-brand" href="/">AgriMarket</a>

//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarContent">
//         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
//           <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
//           <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
//         </ul>

//         {/* <form className="d-flex me-3">
//           <input className="form-control me-2" type="search" placeholder="Search..." />
//           <button className="btn btn-outline-light" type="submit">Search</button>
//         </form> */}

//         <div className="d-flex">
//           {!isLoggedIn ? (
//             <>
//               <a href="/register" className="btn btn-light me-2">Register</a>
//               <a href="/login" className="btn btn-outline-light">Login</a>
//             </>
//           ) : (
//             <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);  // Go back in history
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3 fixed-top">
      <a className="navbar-brand" href="/">AgriMarket</a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
          <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
        </ul>

        <div className="d-flex" style={{ gap: "10px" }}>
          {!isLoggedIn ? (
            <>
              <a href="/register" className="btn btn-light me-2">Register</a>
              <a href="/login" className="btn btn-outline-light">Login</a>
            </>
          ) : (
            <>
              <button onClick={handleBack} className="btn btn-outline-light">Back</button>
              <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
