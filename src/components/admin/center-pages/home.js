/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import UserTable from "./user-table.js"
import TuitTable from "./tuit-table.js"
import UserModal from "../modals/user-modal.js"
import TuitModal from "../modals/tuit-modal.js"
import UserUpdate from "./user-update.js";
import TuitUpdate from "./tuit-update.js";

//Thunks
import {findAllUsersThunk} from "../../../services/users-thunk.js";
import {findTuitsThunk} from "../../../services/tuits-thunk.js";

/**
 * This component is used to handle the routing when the user is on the home page. The center content should change based on actions on the navbar and this allows
 * for that dynamic change to happen
 * @param {Object} parameters This is the syntax for React. We are passing in a 'hideModal' function that alters the display value of the modal. We are also passing in the
 * clickOutsideModal function which is just a fancier way of hiding the modal as well. These functions are just being passed to the modal components
 * @returns - JSX Element
 */
function HomePage({hideModal, clickOutsideModal}){
    
    const { currentUser, isAdmin} = useSelector((state) => state.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //When the page fully loads, we need to check if the currentUser is logged in and is an admin. If not,
    //immediately redirect them to the login page
    useEffect(() => {
        if(currentUser === null || isAdmin === false){
            navigate("/admin");
        }

        //We need to refresh everything as we go - The admin panel ALWAYS needs to be up to date
        dispatch(findAllUsersThunk());
        dispatch(findTuitsThunk())

    }, [navigate, dispatch, currentUser, isAdmin])

    return(
        <div className="col-9 col-lg-6 col-xl-7">
            <Routes>
                <Route index element={<UserTable/>}/>
                <Route path="/users" element={<UserTable/>}/>
                <Route path="/users/edit/:uid" element = {<UserUpdate/>}/>
                <Route path="/tuits/" element={<TuitTable/>}/>
                <Route path="/tuits/edit/:tid" element = {<TuitUpdate/>}/>
            </Routes>
            <UserModal hideModal={hideModal} clickOutsideModal={clickOutsideModal}/>
            <TuitModal hideModal={hideModal} clickOutsideModal={clickOutsideModal}/>
        </div>
    )
}

export default HomePage