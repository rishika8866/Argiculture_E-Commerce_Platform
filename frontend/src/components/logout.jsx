
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // remove JWT token
//     // console.log("xshcv")
//     navigate("/login"); // redirect to login page
//   };
  
//   return (
//     <button onClick={handleLogout} className="btn btn-danger">
//       Logout
//     </button>
//   );

// };

// export default Logout;



/////////update////////
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"; // match slice export

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");  // remove stored user
    localStorage.removeItem("token"); // remove token if you have one
    dispatch(logout());               // clear Redux state
    navigate("/login");               // redirect to login
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
