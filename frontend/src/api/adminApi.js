import axios from "axios";

const API_BASE = "http://localhost:8080/api/Admin"; // Change to your API URL

export const getCustomers = () => axios.get(`${API_BASE}/customers`);
export const getFarmers = () => axios.get(`${API_BASE}/farmers`);
export const getProducts = () => axios.get(`${API_BASE}/products`);
export const getAuditLogs = (params) => axios.get(`${API_BASE}/audit-logs`, { params });
