/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

import {createSlice} from "@reduxjs/toolkit"
import { isLoggedInThunk, findAllUsersThunk, registerThunk, loginThunk, logoutThunk, deleteUserThunk, updateUserThunk } from "../services/users-thunk.js";

//As a note, our user will have the following pertinent properties: username, password, email, accountType, isBlocked, isAdmin
const initialState = {
    loginAttemptFailed: false,
    isAdmin: false,
    currentUser: null,
    allUsers: [],
    totalUsersCount:0,
    blockedUsersCount:0
}

const userSlice = createSlice({
    name: "users",
    //Initial State
    initialState: initialState,

    //Asynchronous Reducers
    extraReducers:{
        [registerThunk.fulfilled]: (state, action) => {
            state.allUsers.push(action.payload)
            state.activeUsers = state.activeUsers + 1;
            window.location.reload();
            return
        },
        [registerThunk.rejected]: (state, action) => {
            alert('A user with that username already exists');
            window.location.reload();
            return
        },

        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.loginAttemptFailed = false;
            if(action.payload.isAdmin === true){
                state.isAdmin = true
            }
            return
        },
        [loginThunk.rejected]: (state, action) => {
            state.currentUser = null
            state.loginAttemptFailed = true;
            state.isAdmin = false;
            return
        },

        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
            state.loginAttemptFailed = false;
            state.isAdmin = false;
            return
        },
        [logoutThunk.rejected]: (state, action) => {
            return
        },

        [isLoggedInThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.isAdmin = action.payload.isAdmin;
        },
        [isLoggedInThunk.rejected]: (state, action) => {
            state.currentUser = null;
            state.isAdmin = false;
        },

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
        [findAllUsersThunk.rejected]: (state, action) => {
            return
        },
        
        [deleteUserThunk.fulfilled]: (state, action) => {
            //Recall that filter will mae a new array with ONLY the values that pass your boolean test
            state.allUsers = state.allUsers.filter((user) => {
                return user._id !== action.payload
            })

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
        [deleteUserThunk.rejected]: (state, action) => {
            return;
        },

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
        [updateUserThunk.rejected]: (state, action) => {
            return
        }
    }
})

export default userSlice.reducer;