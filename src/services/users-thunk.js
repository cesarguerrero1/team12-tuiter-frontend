/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

/**
 * @file The calls we make to the server are asyncronous and so we need to use Thunks
 * in order to appropriately wait for a response from the server and then act on that response.
 * This file in particular handles all of the server calls related to users
 */
import {createAsyncThunk} from "@reduxjs/toolkit"

//Import our services to call the server
import * as authService from "./auth-service.js"
import * as adminService from "./admin-service.js"

/**
 * This function allows us to attempt to login and thus inform our client and server that a user is logged in
 * @returns - This will either return a 403(FORRBIDEN) or the user object that is currently logged in
 */
export const loginThunk = createAsyncThunk('users/login', async(credentials) => {
    const loggedInUser = await authService.login(credentials);
    return loggedInUser;
});

/**
 * This function attempts to logout our user
 * @returns - 200(SUCCESS). Logging out if no one is logged in is not an invalid action.
 */
export const logoutThunk = createAsyncThunk('users/logout', async(user) => {
    return await authService.logout(user);
});

/**
 * This function is essentially the middleman between our client-state and the server-state. When the application starts we immediately
 * want to check if someone is logged in! So we ping the server and then use that response to update our applicaiton state. All of that happens
 * using this THUNK
 * @returns - This will either return a 403 ERROR or the current user object that is logged in
 */
 export const isLoggedInThunk = createAsyncThunk('users/isLoggedIn', async() => {
    const loggedInUser = await authService.isLoggedIn();
    return loggedInUser;
})

/**
 * This function attemtps to find all the registered users in the database
 * @returns - Either all of the users currently in our database or a 403(FORBIDDEN) response status
 */
export const findAllUsersThunk = createAsyncThunk('users/findAllUsers', async() => {
    return await adminService.findAllUsers();
})

/**
 * This function allows us to attempt to add a user to the backend
 * @returns - This will either return a 403(FORBIDDEN) OR a 200(SUCCESS) response status
 */
 export const registerThunk = createAsyncThunk('users/register', async(user) => {
    return await adminService.createUser(user);
});

/**
 * This function will attempt to update a user from the database
 * @returns - Either a 403(FORBIDDEN) or 200(SUCCESS) at which point depending on the status we will update our application state
 */
export const updateUserThunk = createAsyncThunk('users/updateUser', async(user) => {
    await adminService.updateUser(user);
    return user;
})

/**
 * This function will attempt to delete a user from the database
 * @returns - Either a 403(FORBIDDEN) or 200(SUCCESS) at which point depending on the status we will update our application state
 */
 export const deleteUserThunk = createAsyncThunk('users/deleteUser', async(uid) => {
    await adminService.deleteUser(uid);
    return uid;
})

/**
 * This function will attempt to perform a block event (block/unblock) on a given user
 * @returns - Either a 403 (FORBIDDEN) or 200 (SUCCESS) at which point we can then update our application state
 */
export const blockUserThunk = createAsyncThunk('users/blockUser', async(user) => {
    await adminService.blockUser(user);
    return user;
})