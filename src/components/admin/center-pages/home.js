/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { Routes, Route } from "react-router-dom";

//Import Components
import UserTable from "./user-table.js"
import TuitTable from "./tuit-table.js"
import UserModal from "../modals/user-modal.js"
import TuitModal from "../modals/tuit-modal.js"

function HomePage({hideModal, clickOutsideModal}){
    
    const {currentUser, isAdmin} = useSelector((state) => state.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    /*
    useEffect(() => {
        //You should never be allowed to see these pages if you are not logged in AND not an admin
        if(currentUser === null || isAdmin === false){
            navigate("/admin");
        }
    })
    */

    return(
        <div className="col-9 col-lg-6 col-xl-7">
            <Routes>
                <Route index element={<UserTable/>}/>
                <Route path="/users" element={<UserTable/>}/>
                <Route path="/tuits" element={<TuitTable/>}/>
            </Routes>
            <UserModal hideModal={hideModal} clickOutsideModal={clickOutsideModal}/>
            <TuitModal hideModal={hideModal} clickOutsideModal={clickOutsideModal}/>
        </div>
    )
}

export default HomePage