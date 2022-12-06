/*
 * Cesar Guerrero
 * 11/25/22
 * Team 12 - CS5500 Final
 * 
 */

//Handle React Imports
import React from "react";
import { Routes, Route } from "react-router";

//Component Imports
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

function UserRouter() {

    return (
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
    )
}

export default UserRouter;