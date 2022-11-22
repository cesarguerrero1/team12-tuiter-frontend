/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project

File: This file handles the right-side of the admin page
*/

import React from "react";
import { Routes, Route } from "react-router-dom";

function AdminRightSide(){
    return(
        <Routes>
            <Route path="/home" element={<div>This is going to handle miscellaneous data we want to store on the right</div>}/>
        </Routes>
    )
}

export default AdminRightSide