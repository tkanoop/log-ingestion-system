import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const getLogs = async (params = {}) => {
  const res = await axios.get(`${API_BASE}/logs`, { params });
  return res.data;
};
