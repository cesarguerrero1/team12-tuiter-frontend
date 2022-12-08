/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

/**
 * @file This file represents the redux state management for Tuits in our application. As the user/admin interacts with the API we want to ping the server
 * to makes updates but then immediately reflect those updates on the front-end as well!
 */
import {createSlice} from "@reduxjs/toolkit";
import { findTuitsThunk, deleteTuitThunk, createTuitThunk, updateTuitThunk } from "../services/tuits-thunk";

//Initial state of our application. There should be no tuits and all counts should be zero until we ping the server
const initialState = {
    allTuits: [],
    totalTuitsCount:0,
    blockedTuitsCount:0,
    flaggedTuitsCount:0,
}

const tuitsSlice = createSlice({
    name:"tuits",
    initialState:initialState,

    //For our application all state changes will happen due to server calls. Those are asynchronous calls and so our state
    //management needs to be able to also perform asynchronous actions when the state is eventually updated
    extraReducers:{
        /**
         * In addition to users, we need to get Tuits in order for Tuiter to work. The call to server will return an array of
         * Tuits which we will then store in the state of the application so we don't have to keep pinging the server
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [findTuitsThunk.fulfilled]: (state, action) => {
            state.allTuits = action.payload
            //Update counts for Tuits
            state.totalTuitsCount = state.allTuits.length;
            let blockedCount = 0;
            let flaggedCount = 0;
            state.allTuits.forEach((tuit) => {
                if(tuit.isBlocked){
                    blockedCount++;
                }
                if(tuit.isFlagged){
                    flaggedCount++;
                }
            })
            state.blockedTuitsCount = blockedCount;
            state.flaggedTuitsCount = flaggedCount;

        },
        /**
         * If the call to the server fails for the tuits, don't do anything
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [findTuitsThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to call the server to delete a tuit and then update our application depending on the return status. Again a deletion
         * on the server side does not necessitate a call to the server! We can just update our application as it should already be in sync
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [deleteTuitThunk.fulfilled]: (state, action) => {
            //Look at our stored Tuits and filter out only the Tuits that match our logic
            state.allTuits = state.allTuits.filter((tuit) => {
                return tuit._id !== action.payload
            })
            //Update counts
            state.totalTuitsCount = state.allTuits.length;
            let blockedCount = 0;
            let flaggedCount = 0;
            state.allTuits.forEach((tuit) => {
                if(tuit.isBlocked){
                    blockedCount++;
                }
                if(tuit.isFlagged){
                    flaggedCount++;
                }
            })
            state.blockedTuitsCount = blockedCount;
            state.flaggedTuitsCount = flaggedCount;
        },
        /**
         * Don't do anything if the call to delete fails
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [deleteTuitThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to create a Tuit and if we are successful store it in the application state so we are in sync with the database
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [createTuitThunk.fulfilled]: (state, action) => {
            state.allTuits.push(action.payload)
            state.totalTuitsCount = state.allTuits.length;
            //We need to reload as the statistic counter have doesn't interact with the modal that calls this function
            alert('The Tuit was successfully created!');
            window.location.reload();
            return
        },
        /**
         * If the call to the server to create a tuit fails, do nothing
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [createTuitThunk.rejected]: (state, action) => {
            alert('The Tuit could not be created... Contact an admin!');
            window.location.reload();
            return
        },

        /**
         * Attempt to call the server to update a tuit and then update that same tuit in the application state
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [updateTuitThunk.fulfilled]: (state, action) => {
            const newTuit = action.payload
            //Find the tuit we updated in the application state so we keep everything in sync
            if(newTuit){
                let index = state.allTuits.findIndex((tuit) => {
                    return tuit._id === newTuit._id
                })

                state.allTuits[index] = {
                    ...state.allTuits[index],
                    ...newTuit
                }
            }
            
            //Update the counts
            state.totalTuitsCount = state.allTuits.length;
            let blockedCount = 0;
            let flaggedCount = 0;
            state.allTuits.forEach((tuit) => {
                if(tuit.isBlocked){
                    blockedCount++;
                }
                if(tuit.isFlagged){
                    flaggedCount++;
                }
            })
            state.blockedTuitsCount = blockedCount;
            state.flaggedTuitsCount = flaggedCount;


        },
        /**
         * If the update fails, don't do anything to the application state
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [updateTuitThunk.rejected]: (state, action) => {
            return
        },
    }
})

export default tuitsSlice.reducer;