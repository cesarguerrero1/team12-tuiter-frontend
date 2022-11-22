/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project

File: Base Routing file for all of the admin pages
*/

import React from "react";
import { Routes, Route } from "react-router-dom";

/**
 * The Admin function is used to handle routing and what content to render when someone is attempting to access the admin page
 * @returns HTML DIV - The div contains all of the data we want to show on the website
 */
function Admin() {

    return (
        <Routes>
            <Route index element={<div>Login Page</div>} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/home" element={<div>Home Page</div>} />
        </Routes>
    )
}

export default Admin