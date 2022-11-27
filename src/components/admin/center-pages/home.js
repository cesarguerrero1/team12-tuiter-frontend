/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project

*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import UserModal from "../modals/user-modal.js"
import TuitModal from "../modals/tuit-modal.js"

function HomePage({hideModal, clickOutsideModal}) {

    const { currentUser, loginAttemptFailed } = useSelector((state) => state.users);

    useEffect(() => {
        /*
        if(!currentUser){
            navigate("/admin");
        }
        */
    })

    return (
        <div className="col">
            <UserModal hideModal={hideModal} clickOutsideModal={clickOutsideModal}/>
            <TuitModal hideModal={hideModal} clickOutsideModal={clickOutsideModal}/>
        </div>
    )
}

export default HomePage