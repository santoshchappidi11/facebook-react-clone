import axios from "axios";

const api = axios.create({
  baseURL: "https://facebook-clone-yrjn.onrender.com",
  // baseURL: "http://localhost:8000",
});

export default api;
