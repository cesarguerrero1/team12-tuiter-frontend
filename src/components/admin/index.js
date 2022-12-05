/*
Cesar Guerrero
11/22/22
CS55000 - Fall 2022
Team 12 - Final Project
File: Base Routing file for all of the admin pages
*/

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLeftSide from "./left-pages/admin-left-side";
import AdminRightSide from "./right-pages/admin-right-side";
import LoginPage from "./login.js"
import HomePage from "./center-pages/home.js";


//CSS Import
import "./index.css"

//Variables
let userModal = null;
let tuitModal = null;
let userModalButton = null;
let tuitModalButton = null;
let modalCloseButton = null;

/**
 * The Admin function is used to handle routing and what content to render when someone is attempting to access the admin page
 * @returns HTML DIV - The div contains all of the data we want to show on the website
 */
function AdminRouter() {

    function showModal(event) {
        if (event.target === userModalButton) {
            userModal.classList.add('d-block');
        } else if (event.target === tuitModalButton) {
            tuitModal.classList.add('d-block');
        }
    }

    function hideModal(event) {
        //Recall that the close button is (3) steps away from overall modal container that we need to hide
        let parentContainer = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
        console.log(parentContainer);
        if (parentContainer === userModal) {
            userModal.classList.remove('d-block');
        } else if (parentContainer === tuitModal) {
            tuitModal.classList.remove('d-block');
        }
    }

    function clickOutsideModal(event) {
        if (event.target !== event.currentTarget.children[0]) {
            if (event.target === userModal) {
                userModal.classList.remove('d-block');
            } else if (event.target === tuitModal) {
                tuitModal.classList.remove('d-block');
            }
        }
    }

    useEffect(() => {
        //Grab Modals
        userModal = document.getElementById('userModal');
        tuitModal = document.getElementById('tuitModal');
        console.log(userModal);

        //Grab Buttons
        userModalButton = document.getElementById('userModalButton');
        tuitModalButton = document.getElementById('tuitModalButton');

    })


    return (
        <div className="container">
            <div className="row my-2">
                <AdminLeftSide showModal={showModal} />
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home/*" element={<HomePage hideModal={hideModal} clickOutsideModal={clickOutsideModal} />} />
                </Routes>
                <AdminRightSide />
            </div>
        </div>
    )
}

export default AdminRouter;