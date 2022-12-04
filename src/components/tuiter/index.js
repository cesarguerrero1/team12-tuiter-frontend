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

//CSS
import './tuiter.css'

function Tuiter () {
  //Refactor the following routing code to handle a User Interface and the Admin Interface along with a centralized state management system
  return(
    <BrowserRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Navigation/>
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/tuiter" element={<Home/>}/>
              <Route path="/tuiter/:uid" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/home/:uid" element={<Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/notifications" element={<Notifications/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/lists" element={<Lists/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/profile/edit" element={<EditProfile/>}/>
              <Route path="/more" element={<More/>}/>
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Tuiter;