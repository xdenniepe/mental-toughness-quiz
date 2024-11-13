const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = {
  LOGIN: `${API_BASE_URL}/public/login`,
  GET: `${API_BASE_URL}/`,
};

export default api;
