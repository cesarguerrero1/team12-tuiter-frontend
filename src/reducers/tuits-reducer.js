/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

import {createSlice} from "@reduxjs/toolkit";
import { findTuitsThunk, deleteTuitThunk, createTuitThunk, updateTuitThunk } from "../services/tuits-thunk";

const initialState = {
    allTuits: [],
    totalTuitsCount:0,
    blockedTuitsCount:0,
    flaggedTuitsCount:0,
}

const tuitsSlice = createSlice({
    name:"tuits",
    initialState:initialState,

    //Async Reducers
    extraReducers:{
        //Find Tuits
        [findTuitsThunk.fulfilled]: (state, action) => {
            state.allTuits = action.payload
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
        [findTuitsThunk.rejected]: (state, action) => {
            return
        },

        //Delete Tuits
        [deleteTuitThunk.fulfilled]: (state, action) => {
            state.allTuits = state.allTuits.filter((tuit) => {
                return tuit._id !== action.payload
            })
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
        [deleteTuitThunk.rejected]: (state, action) => {
            return
        },

        //Create Tuits
        [createTuitThunk.fulfilled]: (state, action) => {
            state.allTuits.push(action.payload)
            state.totalTuitsCount = state.allTuits.length;
            window.location.reload();
            return
        },
        [createTuitThunk.rejected]: (state, action) => {
            window.location.reload();
            return
        },

        //Update Tuits
        [updateTuitThunk.fulfilled]: (state, action) => {
            const newTuit = action.payload

            if(newTuit){
                let index = state.allTuits.findIndex((tuit) => {
                    return tuit._id === newTuit._id
                })

                state.allTuits[index] = {
                    ...state.allTuits[index],
                    ...newTuit
                }
            }
            
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
        [updateTuitThunk.rejected]: (state, action) => {
            return
        },
    }
})

export default tuitsSlice.reducer;