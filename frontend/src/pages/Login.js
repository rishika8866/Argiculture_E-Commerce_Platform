// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(formData));
  //   localStorage.setItem("login","true");
  // };


  // useEffect(() => {
  //   if (user) {
  //     const roleId = user?.rid?.rid; //


  //     const roleRoutes = {
        
  //       1: '/customer/products',
  //       2: '/farmer/dashboard',
  //       3: '/admin/dashboard'
  //     };

  //     navigate(roleRoutes[roleId] || '/');
  //   }
  // }, [user, navigate]);

////////////////updated//////

  const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(loginUser(formData));
};

useEffect(() => {
  if (user) {
    // store user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    const roleId = user?.rid?.rid;
    const roleRoutes = {
      1: '/customer/dashboard',
      2: '/farmer/dashboard',
      3: '/admin/dashboard'
    };

    navigate(roleRoutes[roleId] || '/');
  }
}, [user, navigate]);
//////////////////////////////////////////


  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account? <a href="/register">Register</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
