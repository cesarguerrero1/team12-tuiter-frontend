/*
Cesar Guerrero
Team 12 - CS5500 Final
12/4/22
*/

import { createAsyncThunk } from "@reduxjs/toolkit";

//Calling our services
import * as adminService from "./admin-service.js"
import * as tuitsService from "./tuits-service.js"

/**
 * This function allows us to attempt to find all of the Tuits in our database and then
 * use those Tuits to update our application
 * @returns - An array of all the Tuits or an empty array
 */
export const findTuitsThunk = createAsyncThunk('tuits/findTuits', async(isAdmin) => {
    //We are using the same thunk but depending on the user type we want to do different things
    if(isAdmin){
        //An admin wants all the tuits
        return await adminService.findAllTuits();
    }else{
        //A normal user wants all the tuits
        return await tuitsService.findAllTuits();
    }
    
})

/**
 * This function allows us to create a Tuit in the database and then update our
 * application state as a result
 * @returns - Either an empty object or the newly created Tuit
 */
 export const createTuitThunk = createAsyncThunk('tuits/createTuit', async(newTuit) => {
    const createdTuit = await tuitsService.createTuitByUser(newTuit.postedBy, newTuit);
    return createdTuit;
})

/**
 * This function allows us to update a Tuit in the database and then update our
 * application state as a result
 * @returns - We are returning the newly updated Tuit Object
 */
export const updateTuitThunk = createAsyncThunk('tuits/updateTuit', async(updatedTuit) => {
    const returnedTuit = await adminService.updateTuit(updatedTuit._id, updatedTuit);
    return returnedTuit;
})

/**
 * This functions allows us to attempt to delete a tuit given a valid tid and then update our
 * application state as a result
 * @returns - We are always returning the tuit id and allowing the reducer to do  different tasks depending if
 * the request was fulfilled or rejected
 */
export const deleteTuitThunk = createAsyncThunk('tuits/deleteTuit', async(tid) => {
    await tuitsService.deleteTuit(tid);
    return tid;
})
