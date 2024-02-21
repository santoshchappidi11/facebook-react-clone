import axios from "axios";

const api = axios.create({
  baseURL: "https://facebook-react-clone-ovj4.onrender.com",
  // baseURL: "http://localhost:8000",
});

export default api;
