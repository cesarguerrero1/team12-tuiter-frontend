/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project

File: This file handles the left-side of the admin page
*/

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./index.js";

function AdminLeftSide(){
    return(
        <Routes>
            <Route path="/home/*" element={<AdminNavbar />} />
        </Routes>
    )
}

export default AdminLeftSide