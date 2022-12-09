import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE;
const USERS_API = `${BASE_URL}/admin/api/users`;

export const findAllUsers = () => axios.get(USERS_API).then(response => response.data);

export const createUser = (user) => axios.post(USERS_API, user).then(response => response.data);

export const updateUser = (user) => axios.put(`${USERS_API}/${user._id}`, user).then(response => response.data);

export const deleteUser = (uid) => axios.delete(`${USERS_API}/${uid}`).then(response => response.data);


export const blockUser = async (user) => {
    if(user.isBlocked === true){
        //We are trying to block the user!
        const response = await axios.put(`${USERS_API}/${user._id}/block`, user);
        return response.data
    }else{
        //We are trying to unblock the user!
        const response = await axios.put(`${USERS_API}/${user._id}/unblock`, user);
        return response.data
    }
}