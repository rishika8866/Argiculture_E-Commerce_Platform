import axios from "axios";

const BASE_URL = "http://localhost:8080/api/customer";

export const fetchProducts = () => axios.get(`${BASE_URL}/products`);

// export const placeOrder = (orderData) => 
//   axios.post(`${BASE_URL}/place-order`, orderData);

export const placeOrder = (orderData) =>
  axios.post(`${BASE_URL}/place-order`, orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  });


export const fetchOrdersByCustomer = (uid) => 
  axios.get(`${BASE_URL}/orders/${uid}`);

export const cancelOrder = (oid) =>
  axios.put(`${BASE_URL}/cancel-order/${oid}`);
