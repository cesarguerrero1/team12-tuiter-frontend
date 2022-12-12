/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React from "react";
import {useSelector} from "react-redux";

/**
 * This function creates the HTML for showing a nice UI that contains the stats for our application
 * @returns JSX Element for handling the stats for our admin to see regarding the users and tuits
 */
function AdminStats(){
    //We need to get our counts from the state management system
    const {totalUsersCount, blockedUsersCount} = useSelector((state) => state.users);
    const {totalTuitsCount, blockedTuitsCount, flaggedTuitsCount} = useSelector((state) => state.tuits);

    return(
        <div className="d-none d-lg-block col-lg-3">
            <div className="fse-border">
                <div className="my-3 px-3">
                    <h6 className="m-0">Total Registered Users</h6>
                    <span>{totalUsersCount}</span>
                </div>
                <hr />
                <div className="my-3 px-3">
                    <h6 className="m-0">Total Blocked Users</h6>
                    <span>{blockedUsersCount}</span>
                </div>
                <hr />
                <div className="my-3 px-3">
                    <h6 className="m-0">Total Number of Tuits</h6>
                    <span>{totalTuitsCount}</span>                   
                </div>
                <hr />
                <div className="my-3 px-3">
                    <h6 className="m-0">Total Blocked Tuits</h6>
                    <span>{blockedTuitsCount}</span>                 
                </div>
                <hr />
                <div className="my-3 px-3">
                    <h6 className="m-0">Total Flagged Tuits</h6>
                    <span>{flaggedTuitsCount}</span>        
                </div>
            </div>
        </div>
    )
}

export default AdminStats