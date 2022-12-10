import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE;
const ADMINS_API = `${BASE_URL}/admin/api`;

export const findAllTuits = () => axios.get(`${ADMINS_API}/tuits`).then(response => response.data);

export const updateTuit = (tid, tuit) => axios.put(`${ADMINS_API}/tuits/${tid}`, tuit).then(response => response.data);
