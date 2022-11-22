import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import {Login} from "../profile/login";

//We are adding in our new components
import Admin from "../admin";
import AdminLeftSide from "../admin/admin-left-side.js";
import AdminRightSide from "../admin/admin-right-side.js";

function Tuiter () {
  return(
    <BrowserRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Routes>
              <Route path="/*" element={<Navigation/>}/>
              <Route path="/admin/*" element={<AdminLeftSide/>} />
            </Routes>
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
              <Route path="/admin/*" element={<Admin/>} />
            </Routes>
          </div>
          <div className="ttr-right-column">
            <Routes>
              <Route path="/*" element={<WhatsHappening/>}/>
              <Route path="/admin/*" element={<AdminRightSide/>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Tuiter;