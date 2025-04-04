// frontend/config/api.js
const IP_ADDRESS = '192.168.31.247'; // Replace with your computer's actual IP address
const API_PORT = 8000;
const API_BASE_URL = `http://${IP_ADDRESS}:${API_PORT}/api`;

export default {
  baseURL: API_BASE_URL,
  endpoints: {
    users: `${API_BASE_URL}/users`,
    education: `${API_BASE_URL}/users/education`,
    linkedin: `${API_BASE_URL}/users/linkedin`,
    posts: `${API_BASE_URL}/posts`,
    unverifiedUsers: `${API_BASE_URL}/users/unverified`,
    verifyUser: `${API_BASE_URL}/users/verify`,
    colleges: `${API_BASE_URL}/colleges`,
  }
};


