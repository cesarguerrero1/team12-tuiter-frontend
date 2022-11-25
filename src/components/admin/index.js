/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project

File: Base Routing file for all of the admin pages
*/

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLeftSide from "./left-pages/admin-left-side";
import AdminRightSide from "./right-pages/admin-right-side";
import LoginPage from "./center-pages/login.js"
import HomePage from "./center-pages/home.js";

//CSS Import
import "./index.css"

/**
 * The Admin function is used to handle routing and what content to render when someone is attempting to access the admin page
 * @returns HTML DIV - The div contains all of the data we want to show on the website
 */
function AdminRouter() {
    return (
        <div className="container">
            <div className="row my-2">
                <AdminLeftSide />
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home/*" element={<HomePage />} />
                </Routes>
                <AdminRightSide/>
            </div>
        </div>
    )
}

export default AdminRouter