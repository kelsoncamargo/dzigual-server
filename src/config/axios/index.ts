import axios from "axios";

const api = axios.create({
  timeout: 7000,
});

export default api;
