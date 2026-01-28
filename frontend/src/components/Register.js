import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  uname: "",
  email: "",
  password: "",
  contact_no: "",
  acc_no: "",
  address: "",
  city_id: "",
  rid: "",
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...initialState };
    case "ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
  };

  const validateForm = () => {
    if (!state.uname.trim()) {
      return "Name is required and cannot be only spaces.";
    }
    if (!state.email) {
      return "Email is required.";
    }
    if (!/\S+@\S+\.\S+/.test(state.email)) {
      return "Enter a valid email address.";
    }
    if (!state.password || state.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (!state.contact_no || !/^\d{10}$/.test(state.contact_no)) {
      return "Contact number must be 10 digits.";
    }
    if (!state.acc_no || !/^\d{9,18}$/.test(state.acc_no)) {
      return "Account number must be between 9-18 digits.";
    }
    if (!state.address.trim()) {
      return "Address is required.";
    }
    if (!state.city_id) {
      return "Select a city.";
    }
    if (!state.rid) {
      return "Select a role.";
    }
    return null;
  };

  const sendData = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      dispatch({ type: "ERROR", error: validationError });
      return;
    }

    dispatch({ type: "LOADING" });

    const requestData = {
      uname: state.uname.trim(),
      email: state.email,
      password: state.password,
      contact_no: state.contact_no,
      acc_no: state.acc_no,
      address: state.address.trim(),
      city_id: parseInt(state.city_id),
      rid: {
        rid: parseInt(state.rid)
      }
    };

    try {
      await axios.post("http://localhost:8080/api1/register", requestData);
      alert("✅ Registration successful");
      dispatch({ type: "SUCCESS" });
      navigate("/login");
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: error.response?.data?.message || "Registration failed"
      });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={sendData} className="w-50 mx-auto p-4 border rounded shadow bg-light">
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="uname"
            value={state.uname}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Contact No:</label>
          <input
            type="text"
            className="form-control"
            name="contact_no"
            value={state.contact_no}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Account No:</label>
          <input
            type="text"
            className="form-control"
            name="acc_no"
            value={state.acc_no}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={state.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>City:</label>
          <select
            className="form-select"
            name="city_id"
            value={state.city_id}
            onChange={handleChange}
          >
            <option value="">-- Select City --</option>
            <option value="1">Mumbai</option>
            <option value="2">Nashik</option>
            <option value="3">Pune</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Role:</label>
          <select
            className="form-select"
            name="rid"
            value={state.rid}
            onChange={handleChange}
          >
            <option value="">-- Select Role --</option>
            <option value="1">Customer</option>
            <option value="2">Seller</option>
          </select>
        </div>

        {state.error && <div className="alert alert-danger">{state.error}</div>}

        <button type="submit" className="btn btn-success w-100" disabled={state.loading}>
          {state.loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
