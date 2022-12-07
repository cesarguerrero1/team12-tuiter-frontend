import axios from "axios";
//We need to change this URL with our Heroku URL
const BASE_URL = process.env.REACT_APP_API_BASE;
const USERS_API = `${BASE_URL}/admin/api/users`;

export const createUser = (user) => axios.post(`${USERS_API}`, user).then(response => response.data);

export const findAllUsers = () => axios.get(USERS_API).then(response => response.data);

export const deleteUser = (uid) => axios.delete(`${USERS_API}/${uid}`).then(response => response.data);

export const updateUser = (user) => axios.put(`${USERS_API}/${user._id}`, user).then(response => response.data);