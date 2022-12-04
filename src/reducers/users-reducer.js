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
    allUsers: []
}

const userSlice = createSlice({
    //This is how we call it form the store
    name: "users",
    //Initial State
    initialState: initialState,

    //Asynchronous Reducers
    extraReducers:{
        [registerThunk.fulfilled]: (state, action) => {
            state.allUsers.push(action.payload)
        },
        [registerThunk.rejected]: (state, action) => {
            return
        },

        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [loginThunk.rejected]: (state, action) => {
            return
        },

        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
        },
        [logoutThunk.rejected]: (state, action) => {
            return
        },

        [isLoggedInThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [isLoggedInThunk.rejected]: (state, action) => {
            state.currentUser = null;
        },

        [findAllUsersThunk.fulfilled]: (state, action) => {
            state.allUsers = action.payload
        },
        [findAllUsersThunk.rejected]: (state, action) => {
            return
        },
        [deleteUserThunk.fulfilled]: (state, action) => {
            //Recall that filter will mae a new array with ONLY the values that pass your boolean test
            state.allUsers = state.allUsers.filter((user) => {
                if(user._id != action.payload){
                    return user;
                }
            })
        },
        [deleteUserThunk.rejected]: (state, action) => {
            return;
        },
        [updateUserThunk.fulfilled]: (state, action) => {
            //Recall that we want to look for the index and then update that index
            state.allUsers.findIndex((user) => {
                if(user._id = action.payload._uid){
                    return user
                }
            })

            state.allUsers[index] = action.payload
        },
        [updateUserThunk.rejected]: (state, action) => {
            return
        }
    }
})

export default userSlice.reducer;