/*
Cesar Guerrero
Team 12 - CS5500 Final
12/11/22
*/

/**
 * @file This file represents all of the axios calls to our server to specific HTTP endpoints for our admin. Our admin is performing
 * operations that we would not want anyone else to accidentally be able to use so we are segregating as muchc as we can
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE;
const ADMIN_API = `${BASE_URL}/admin/api`;

/**
 * Axios call to the server to GET a list of all of the users via the Admin's custom HTTP endpoints
 * @returns - An empty array or a an array of User objects
 */
export const findAllUsers = () => axios.get(`${ADMIN_API}/users`).then(response => response.data);

/**
 * Axios call to server to POST a new user via the Admin's custom HTTP endpoints
 * @param {User} user - This is the object that contains key-value pairs to set the information for our new user
 * @returns - Either nothing or the newly created User object
 */
export const createUser = (user) => axios.post(`${ADMIN_API}/users`, user).then(response => response.data);

/**
 * Axios PUT call to update a given user
 * @param {User} user - This is the object containing the information we want to change about our user
 * @returns - Either a 403 error or a 200 success
 */
export const updateUser = (user) => axios.put(`${ADMIN_API}/users/${user._id}`, user).then(response => response.data);

/**
 * Axios DELETE call  to remove a user
 * @param {String} uid - The unique id of the user we wish to delete from the database
 * @returns - Either a 403 error or a 200 success
 */
export const deleteUser = (uid) => axios.delete(`${ADMIN_API}/users/${uid}`).then(response => response.data);

/**
 * Axios call to a custom Admin HTTP endpoint to simply update the 'isBlocked' field for a given User
 * @param {User} user - This user object will always contain a copy of the current user with only a change to the isBlocked field
 * @returns - Either a 403 error or 200 success
 */
export const blockUser = async (user) => {
    if(user.isBlocked === true){
        //We are trying to block the user!
        const response = await axios.put(`${ADMIN_API}/users/${user._id}/block`, user);
        return response.data
    }else{
        //We are trying to unblock the user!
        const response = await axios.put(`${ADMIN_API}/users/${user._id}/unblock`, user);
        return response.data
    }
}

/**
 * A call to the server to get all of the Tuits that exist in the database
 * @returns Either an empty array or an array of all the Tuit objects
 */
export const findAllTuits = () => axios.get(`${ADMIN_API}/tuits`).then(response => response.data);

/**
 * A call to the server to update a given Tuit
 * @param {String} tid - ID for a given tuit
 * @param {Tuit} tuit - A tuit object containing what we wish to change about a given Tuit in the database
 * @returns Either a 403 or 200 Response Status
 */
export const updateTuit = (tid, tuit) => axios.put(`${ADMIN_API}/tuits/${tid}`, tuit).then(response => response.data);
