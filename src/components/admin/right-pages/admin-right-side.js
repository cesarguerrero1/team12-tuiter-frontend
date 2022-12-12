/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project
File: This file handles the right-side of the admin page
*/

import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminStats from "./index.js"

/**
 * Router for future functionality of our admin portal
 * @returns JSX Router for the right side of our admin portal
 */
function AdminRightSide(){
    return(
        <Routes>
            <Route path="/home/*" element={<AdminStats />} />
        </Routes>
    )
}

export default AdminRightSide