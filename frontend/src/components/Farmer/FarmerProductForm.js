import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slices/farmerSlice';

const FarmerProductForm = () => {
  const [form, setForm] = useState({
    categoryName: '',
    productName: '',
    userName: '',
    price: '',
    qty: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: parseInt(form.price, 10),
      qty: parseInt(form.qty, 10)
    };

    dispatch(addProduct(payload));

    // Reset form
    setForm({
      categoryName: '',
      productName: '',
      userName: '',
      price: '',
      qty: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add Product</h4>

      <input
        name="categoryName"
        value={form.categoryName}
        onChange={handleChange}
        placeholder="Category Name"
        required
        className="form-control mb-2"
      />

      <input
        name="productName"
        value={form.productName}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="form-control mb-2"
      />

      <input
        name="userName"
        value={form.userName}
        onChange={handleChange}
        placeholder="Farmer Username"
        required
        className="form-control mb-2"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="form-control mb-2"
      />

      <input
        type="number"
        name="qty"
        value={form.qty}
        onChange={handleChange}
        placeholder="Quantity"
        required
        className="form-control mb-2"
      />

      <button className="btn btn-primary">Add Product</button>
    </form>
  );
};

export default FarmerProductForm;