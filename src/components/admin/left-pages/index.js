/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React from "react";
import {Link} from "react-router-dom";

function AdminNavbar({showModal}){
    return(
        <div className="col-3 col-xl-2">
           <div className = "fse-border">
                <div>
                    <div className="fse-navbar-links">
                        <h6>Welcome,  </h6>
                        <i className="fab fa-twitter fse-twitter-color fa-"></i> 
                    </div>
                </div>
                <div>
                    <Link to="./users" className="fse-navbar-links"><i className="" /> Users</Link>
                    <Link to="./tuits" className="fse-navbar-links"><i className="" /> Tuits</Link>
                </div>
                <div>
                    <button id="userModalButton" className="btn fse-navbar-button" onClick={(event) => {showModal(event)}}>Add User</button>
                    <button id="tuitModalButton" className="btn fse-navbar-button" onClick={(event) => {showModal(event)}}>Add Tuit</button>
                </div>
           </div>
        </div>
    )
}

export default AdminNavbar