/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE;
const AUTH_API = `${BASE_URL}/api/auth`;

/**
 * Since we are using COOKIES we need to carry them with us and this allows us to do that
 */
const api = axios.create({
    withCredentials: true,
})

/**
 * Attempt to ping the server and register them as a user
 * @param user - An object containing their username, email, and password
 * @return - Either a Resonse Status of 200(SUCCESS) or 403(FORBIDDEN)
 */
async function register(user){
    const response = await api.post(`${AUTH_API}/register`, user);
    return response.data
}

/**
 * Attempt to login the user
 * @param {object} credentials - An object containing the username and password
 * @returns - Returns either a user object or a 403(FORBIDDEN) response status
 */
async function login(credentials){
    const response = await api.post(`${AUTH_API}/login`, credentials);
    return response.data
}

/**
 * Attempt to logout the user
 * @param {user} user - A user object containing their username and password so the system can
 * check if they are logged in and then subsequently log them out and destroy their session
 * @returns Either a Response Status of 200(SUCCESS) or 403(FORBIDDEN)
 */
async function logout(user){
    const response = api.post(`${AUTH_API}/logout`, user);
    return response.data
}

/**
 * Check to see if a user is logged in
 * @returns Either a 403(FORBIDDEN) response status or the user that is logged in
 */
async function isLoggedIn(){
    const response = api.post(`${AUTH_API}/profile`);
    return response.data
}


export {register, login, logout, isLoggedIn}