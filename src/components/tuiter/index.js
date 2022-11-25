/*
 * Cesar Guerrero
 * 11/24/22
 * Team 12 - CS5500 Final
 * This is our entry into our entire program
 */

//Handle React Imports
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

//Component Imports
import CheckUser from "../authentication/index.js"
import UserRouter from "./user-router.js";
import AdminRouter from "../admin/index.js"

//Import Redux items
import usersReducer from "../../reducers/users-reducer.js"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

//import CSS
import "./index.css"

const store = configureStore({
    reducer: {
        users: usersReducer
    }
})

/**
 * Our entire program will rely on the server and the client staying in sync. We are going to use redux to handle that. Additionally we are going
 * to handle checking, for the entire program, whether or not a user is logged in
 * @returns - HTML elements
 */
function Tuiter() {

    return (
        <Provider store={store}>
            <CheckUser>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<UserRouter />} />
                        <Route path="/*" element={<UserRouter />} />
                        <Route path="/admin/*" element={<AdminRouter />} />
                    </Routes>
                </BrowserRouter>
            </CheckUser>
        </Provider>
    );
}

export default Tuiter;