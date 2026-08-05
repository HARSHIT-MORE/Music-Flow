import axios from "axios";

const api = axios.create({
  baseURL: "https://music-flow-ouso.onrender.com/api",
  withCredentials: true,
});

export default api;