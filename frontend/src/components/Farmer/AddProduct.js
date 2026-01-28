import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/farmerSlice"; // adjust path

const AddProduct = () => {
  const dispatch = useDispatch();
  
  const [form, setForm] = useState({
    categoryName: "",
    productName: "",
    userName: "", // could be auto-filled from localStorage
    price: "",
    qty: ""
  });
  
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct({
        categoryName: form.categoryName,
        productName: form.productName,
        userName: form.userName,
        price: parseInt(form.price, 10),
        qty: parseInt(form.qty, 10)
      })).unwrap();

      setMessage("✅ Product added successfully!");
      setForm({ categoryName: "", productName: "", userName: "", price: "", qty: "" });
    } catch (err) {
      setMessage("❌ Failed to add product.");
    }
  };

  return (
    <div className="container col-md-6">
      <h3 className="text-center my-4">Add Product</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="form-group mb-3">
          <label>Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={form.categoryName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Farmer Username</label>
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Quantity</label>
          <input
            type="number"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-success w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
