/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project

*/

import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


function HomePage(){

    const {currentUser, loginAttemptFailed} = useSelector((state) => state.users);

    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser){
            navigate("/admin");
        }
    })

    return(
        <div className="col">
            {currentUser && 
                <div>
                    Whenever you click on the navbar, content will appear here
                </div>
            }
        </div>
    )
}

export default HomePage