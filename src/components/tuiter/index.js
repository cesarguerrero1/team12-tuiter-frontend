/*
Cesar Guerrero
12/4/22
CS5500 - After meeting with the professor we are going back and retroactively just making sure all of our pull requests are lined up.
1. Add in our custom CSS sheet
2. Handle the implementation of Redux (Reducers, Store, Provider)
*/

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

//Components
import CheckUser from "../authentication/index.js"
import UserRouter from "./user-router.js";
import AdminRouter from "../admin/index.js"

//Redux
import usersReducer from "../../reducers/users-reducer.js"
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"

//CSS
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