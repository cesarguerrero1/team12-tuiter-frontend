/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

/**
 * @file This file represents the redux state management for users in our application. As the user/admin interacts with the API we want to ping the server
 * to makes updates but then immediately reflect those updates on the front-end as well!
 */

import {createSlice} from "@reduxjs/toolkit"
import { isLoggedInThunk, findAllUsersThunk, registerThunk, loginThunk, logoutThunk, deleteUserThunk, updateUserThunk, blockUserThunk } from "../services/users-thunk.js";

//Initial state of our system
//We want there to be no collection of users, no logged in user (therefore no admin either), zero for all of our counts,
//and for the system to state that no one has attempted to login
const initialState = {
    loginAttemptFailed: false,
    isAdmin: false,
    currentUser: null,
    allUsers: [],
    totalUsersCount:0,
    blockedUsersCount:0
}

//This syntax will soon be deprecated so will need to eventually change
const userSlice = createSlice({
    name: "users",
    initialState: initialState,

    //For our application all state changes will happen due to server calls. Those are asynchronous calls and so our state
    //management needs to be able to also perform asynchronous actions when the state is eventually updated
    extraReducers:{
        /**
         * When the user attempts to register and a call is made to our server, if the call was successfull then add
         * that user to our local array of users
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [registerThunk.fulfilled]: (state, action) => {
            state.allUsers.push(action.payload)
            state.activeUsers = state.activeUsers + 1;
            alert('The user was successfully created!');
            //We need to reload as the statistic counter have doesn't interact with the modal that calls this function
            window.location.reload();
            return
        },
        /**
         * When the user attempts to register and the call fails then alert the user!
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [registerThunk.rejected]: (state, action) => {
            alert('A user with that username already exists');
            return
        },

        /**
         * If a user attempts to login and the call is successful, inform our state that this is the current user and update our properties
         * accordingly
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.loginAttemptFailed = false;
            if(action.payload.isAdmin === true){
                state.isAdmin = true
            }
            return
        },
        /**
         * If the user attempts to login and the call is unsuccessful, set the currentUser to null and update the other properties accordingly
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [loginThunk.rejected]: (state, action) => {
            state.currentUser = null
            state.loginAttemptFailed = true;
            state.isAdmin = false;
            return
        },

        /**
         * When the user makes a logout call, it will always return a success error. Making a logout call (assuming you were able to) will always remove anyone
         * who is logged in so even if no one is, it doesn't matter
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
            state.loginAttemptFailed = false;
            state.isAdmin = false;
            return
        },

        /**
         * We need to constantly check if someone is logged in to ensure the correct content is being displayed everywhere. If they are logged in
         * then make them the currentUser and check if they are an admin
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [isLoggedInThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.isAdmin = action.payload.isAdmin;
        },
        /**
         * If someone is not logged in well then make sure the application sets the state appropriately
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [isLoggedInThunk.rejected]: (state, action) => {
            state.currentUser = null;
            state.isAdmin = false;
        },

        /**
         * In order for the program to operate, we need to ensure we can get all the users from the database. So we ping the server
         * and then we set our state to reflect all of the users, how many there are, and who is blocked or not.
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [findAllUsersThunk.fulfilled]: (state, action) => {
            state.allUsers = action.payload
            state.totalUsersCount = state.allUsers.length;
            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if(user.isBlocked === true){
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;
        },
        /**
         * If we ping the sever and there is an error in returning the users then dont do anything! 
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [findAllUsersThunk.rejected]: (state, action) => {
            return
        },
        
        /**
         * Attempt to delete a user from the database. Assuming the call is successful, instead of getting all the users again let's just update
         * our current state of users which in theory is the exact same as the database up until this point
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [deleteUserThunk.fulfilled]: (state, action) => {
            //Recall that filter will mae a new array with ONLY the values that pass your boolean test
            state.allUsers = state.allUsers.filter((user) => {
                return user._id !== action.payload
            })

            //Update counts
            state.totalUsersCount = state.allUsers.length;
            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if(user.isBlocked === true){
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;


            return
        },
        /**
         * If the attempt to delete the user fails, then don't do anything
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [deleteUserThunk.rejected]: (state, action) => {
            return;
        },

        /**
         * Attempt to update a user. If the update to the server is successful we again can just alter our application state instead of pinging the server
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [updateUserThunk.fulfilled]: (state, action) => {
            //Recall that we want to look for the index and then update that index
            const index = state.allUsers.findIndex((user) => {
                return user._id === action.payload._uid
            })

            state.allUsers[index] = action.payload

            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if(user.isBlocked === true){
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;

            return
        },
        /**
         * If the call to the server fails for updating a user, then ignore it
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [updateUserThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to update the blocked status of the user. If the block update to the server is successful we again can just alter our application state instead of pinging the server
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [blockUserThunk.fulfilled]: (state, action) => {
            //Recall that we want to look for the index and then update that index
            const index = state.allUsers.findIndex((user) => {
                return user._id === action.payload._uid
            })

            state.allUsers[index] = action.payload

            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if(user.isBlocked === true){
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;

            return
        },
        /**
         * If the call to the server fails for updating the blocking of a user, then ignore it
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [blockUserThunk.rejected]: (state, action) => {
            return
        }

    }
})

export default userSlice.reducer;