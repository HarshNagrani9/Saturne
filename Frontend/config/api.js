// frontend/config/api.js
//192.168.31.1
const IP_ADDRESS = '192.168.31.247'; // Replace with your computer's actual IP address
const API_PORT = 8000;
const API_BASE_URL = `http://localhost:${API_PORT}/api`;

export default {
  baseURL: API_BASE_URL,
  endpoints: {
    users: `${API_BASE_URL}/users`,
    education: `${API_BASE_URL}/users/education`,
    linkedin: `${API_BASE_URL}/users/linkedin`,
    colleges: `${API_BASE_URL}/colleges`,
  }
};


