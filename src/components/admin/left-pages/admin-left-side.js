/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project
File: This file handles the left-side of the admin page
*/

import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "./index.js";

/**
 * Router for future functionality of our admin portal
 * @returns JSX Router for the left ide of our admin portal
 */
function AdminLeftSide({currentUser, showModal}){
    return(
        <Routes>
            <Route path="/home/*" element={<AdminNavbar currentUser={currentUser} showModal={showModal}/>} />
        </Routes>
    )
}

export default AdminLeftSide