import axios from "axios";
//We need to change this URL with our Heroku URL
const BASE_URL = process.env.REACT_APP_API_BASE;

export const findAllTuits = () => axios.get(`${BASE_URL}/admin/api/tuits`).then(response => response.data);

export const createTuit = (uid, tuit) => axios.post(`${BASE_URL}/api/users/${uid}/tuits`, tuit).then(response => response.data);

export const updateTuit = (tid, tuit) => axios.put(`${BASE_URL}/admin/api/tuits/${tid}`, tuit).then(response => response.data);

export const deleteTuit = (tid) => axios.delete(`${BASE_URL}/api/tuits/${tid}`).then(response => response.data);
