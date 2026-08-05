import axios from "axios";

const api = axios.create({
  baseURL: "https://music-flow-ouso.onrender.com",
  withCredentials: true,
});

export default api;