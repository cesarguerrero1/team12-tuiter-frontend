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
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import Login from "../profile/login";
import CheckUser from "../authentication/index.js"

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
                  <div className="container">
                      <div className="row my-2">
                          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                              <Navigation />
                          </div>
                          <div className="col-10 col-lg-7 col-xl-6">
                              <Routes>
                                  <Route path="/" element={<Home />} />
                                  <Route path="/login" element={<Login />} />
                                  <Route path="/tuiter" element={<Home />} />
                                  <Route path="/tuiter/:uid" element={<Home />} />
                                  <Route path="/home" element={<Home />} />
                                  <Route path="/home/:uid" element={<Home />} />
                                  <Route path="/explore" element={<Explore />} />
                                  <Route path="/notifications" element={<Notifications />} />
                                  <Route path="/messages" element={<Messages />} />
                                  <Route path="/bookmarks" element={<Bookmarks />} />
                                  <Route path="/lists" element={<Lists />} />
                                  <Route path="/profile" element={<Profile />} />
                                  <Route path="/profile/edit" element={<EditProfile />} />
                                  <Route path="/more" element={<More />} />
                              </Routes>
                          </div>
                          <div className="d-none d-lg-block col-lg-4">
                              <WhatsHappening />
                          </div>
                      </div>
                  </div>
              </BrowserRouter>
          </CheckUser>
      </Provider>
  );
}
export default Tuiter;