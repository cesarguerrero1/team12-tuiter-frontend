/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux"

import { logoutThunk } from "../../../services/users-thunk.js";

/**
 * The Admin Navbar allows the admin to change the center content to cycle through different pages with ease
 * @param {Object} parameters This is the syntax for React. We are passing in the currentUser that is loggedin to display on the top of the navbar. We are also passing
 * the function to allow our navbar buttons to open the modals we created
 * @returns - JSX Element
 */
function AdminNavbar({currentUser, showModal}){  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logoutClickHandler(){
        dispatch(logoutThunk())
        navigate('/admin/login')
    }

    return(
        <div className="col-3 col-xl-2">
           <div className = "fse-border">
                <div>
                    <div className="fse-navbar-links">
                        <h6>Current Admin: {currentUser && currentUser.username}</h6>
                        <h6 className="text-danger text-uppercase text-decoration-underline" onClick={logoutClickHandler}>( Logout )</h6>
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