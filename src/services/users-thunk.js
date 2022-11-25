/*
Cesar Guerrero
Team 12 - CS5500 Final
11/24/22

*/

import {createAsyncThunk} from "@reduxjs/toolkit"

//Import our service to call the server
import * as authService from "./auth-service.js"
import * as usersService from "./users-service.js"

/**
 * This function allows us to attempt to add a user to the backend
 * returns - This will either return a 403(FORBIDDEN) OR a 200(SUCCESS) response status
 */
export const registerThunk = createAsyncThunk('users/register', async(user) => {
    await authService.register(user);
    //If we are successful then we want to register this user in our client-side state
    return user;
});

/**
 * This function allows us to attempt to login and thus inform our client and server that a user is logged in
 * returns - This will either return a 403(FORRBIDEN) or the user object that is currently logged in
 */
export const loginThunk = createAsyncThunk('users/login', async(credentials) => {
    const loggedInUser = await authService.login(credentials);
    return loggedInUser;
});

/**
 * This function attempts to logout our user
 * returns - Either a 403(FORBIDDEN) or 200(SUCCESS) at which point depeneind on the reponse status
 * we will update our client application state
 */
export const logoutThunk = createAsyncThunk('users/logout', async(user) => {
    return await authService.logout(user);
});

/**
 * This function is essentially the middleman between our client-state and the server-state. When the application starts we immediately
 * want to check if someone is logged in! So we ping the server and then use that response to update our applicaiton state. All of that happens
 * using this THUNK
 * returns - This will either return a 403 ERROR or the current user object that is logged in
 */
 export const isLoggedInThunk = createAsyncThunk('users/isLoggedIn', async() => {
    const loggedInUser = await authService.isLoggedIn();
    return loggedInUser;
})

/**
 * This function attemtps to find all the registered users in the database
 * returns - Either all of the users currently in our database or a 403(FORBIDDEN) response status
 */
export const findAllUsersThunk = createAsyncThunk('users/findAllUsers', async() => {
    const allusers = await usersService.findAllUsers();
    return allusers;
})

/**
 * This function will attempt to delete a user from the database
 * @returns - Either a 403(FORBIDDEN) or 200(SUCCESS) at which point depending on the status we will update our application state
 */
export const deleteUserThunk = createAsyncThunk('users/deleteUser', async(uid) => {
    await usersService.deleteUsersByUsername(user);
    return uid;
})

/**
 * This function will attempt to update a user from the database
 * Either a 403(FORBIDDEN) or 200(SUCCESS) at which point depending on the status we will update our application state
 */
export const updateUserThunk = createAsyncThunk('users/updateUser', async(user) => {
    const updatedUser = await usersService.updateUser(user);
    return updatedUser;
})


