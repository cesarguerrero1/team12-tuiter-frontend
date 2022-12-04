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

function AdminRightSide(){
    return(
        <Routes>
            <Route path="/home/*" element={<AdminStats />} />
        </Routes>
    )
}

export default AdminRightSide