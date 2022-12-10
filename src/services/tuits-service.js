import axios from "axios";
//We need to change this URL with our Heroku URL
const BASE_URL = process.env.REACT_APP_API_BASE;
const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

export const findAllTuits = () => axios.get(TUITS_API).then(response => response.data);

export const findTuitById = (tid) => axios.get(`${TUITS_API}/${tid}`).then(response => response.data);

export const findTuitByUser = (uid) => axios.get(`${USERS_API}/${uid}/tuits`).then(response => response.data);

export const createTuitByUser = (uid, tuit) => axios.post(`${USERS_API}/${uid}/tuits`, tuit).then(response => response.data);

export const updateTuit = (tid, tuit) => axios.put(`${TUITS_API}/${tid}`, tuit).then(response => response.data);

export const deleteTuit = (tid) => axios.delete(`${TUITS_API}/${tid}`).then(response => response.data);
