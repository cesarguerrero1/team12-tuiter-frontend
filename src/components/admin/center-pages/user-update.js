/*
Cesar Guerrero
12/4/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams, useNavigate } from "react-router";

//Import services
import {deleteUserThunk, updateUserThunk} from "../../../services/users-thunk.js";

/**
 * When this function is called, we need to bring up a screen wherein the admin can see all of the data associated with the user and edit/block/delete them
 * @param {user} user - The user we are going to display information for
 */
function UserUpdate() {
    const {uid} = useParams();
    const {allUsers} = useSelector(state => state.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let userToEdit = allUsers.find((user) => {
        return user._id === uid;
    })

    let user = {
        username: "xcesarguerrero",
        email: "guerrero.ce@northeastern.edu",
        passwordHash: "gasdfasdjkfalksdajfadsf",
        accountType: "ADMIN",
        maritalStatus: "SINGLE",
        isBlocked: false,
        isAdmin: false,
        joinedDate:"2022-01-04"
    }

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [accountType, setAccountType] = useState(user.accountType);
    const [maritalStatus, setMaritalStatus] = useState(user.maritalStatus);
    const [isBlocked, setIsBlocked] = useState(user.isBlocked);
    const [isAdmin, setIsAdmin] = useState(user.isAdmin)

    function updateClickHandler(){
        console.log(username, email, accountType, maritalStatus, isBlocked, isAdmin);
        //dispatch(updateUserThunk())

    }

    function deleteClickHandler(){
        console.log(username, email, accountType, maritalStatus, isBlocked, isAdmin);
        //dispatch(deleteUserThunk())
    }


    return (
        <div className= "fse-border py-3 px-2">
            <h6 onClick={() => navigate('../users')}><i className="fas fa-chevron-left"></i> Return</h6>
            <div className="m-3">
                <label for="editUsername" className="form-label text-start">Username</label>
                <input type="text" className="form-control" id="editUsername" onChange={(event) => { setUsername(event.target.value) }} value={username}/>
            </div>
            <div className="m-3">
                <label for="editEmail" className="form-label text-start">Email</label>
                <input type="email" className="form-control" id="editEmail" onChange={(event) => { setEmail(event.target.value) }} value={email}/>
            </div>
            <div className="m-3">
                <label for="editPassword" className="form-label">Password Hash (Read Only)</label>
                <input type="text" className="form-control" id="editPassword" value={user.passwordHash} readOnly/>
            </div>
            <div className="m-3">
                <label for="editAccountType" className="form-label">Account Type</label>
                <select id="editAccountType" className="form-select" onChange={(event) => {setAccountType(event.target.value)}} >
                    <option value="USER" selected={accountType === "USER" ? true : false}>USER</option>
                    <option value="ADMIN" selected={accountType === "ADMIN" ? true : false}>ADMIN</option>
                </select>
            </div>
            <div className="m-3">
                <label for="editMaritalStatus" className="form-label">Marital Status</label>
                <select id="editMaritalStatus" className="form-select" onChange={(event) => {setMaritalStatus(event.target.value)}} >
                    <option value="SINGLE" selected={maritalStatus === "SINGLE" ? true : false}>SINGLE</option>
                    <option value="MARRIED" selected={maritalStatus === "MARRIED" ? true : false}>MARRIED</option>
                    <option value="DIVORCED" selected={maritalStatus === "DIVORCE" ? true : false}>DIVORCED</option>
                </select>
            </div>
            <div className="m-3">
                <span className="me-3">
                    <input type="checkbox" className="form-check-input me-1" id="editBlocked" onChange={() => {setIsBlocked(!isBlocked)}} checked={isBlocked === true ? true : false}/>
                    <label for="editBlocked" className="form-check-label" >Blocked?</label>
                </span>
                <span className="me-3">
                    <input type="checkbox" className="form-check-input me-1" id="editAdmin" onChange={() => {setIsAdmin(!isAdmin)}} checked={isAdmin === true ? true : false}/>
                    <label for="editAdmin" className="form-check-label">Admin Permissions?</label>
                </span>
            </div>
            <div className="m-3">
                <label for="editJoinDate" className="form-label">Joined Date (Read Only)</label>
                <input type="date" className="form-control" id="editJoinDate" value={user.joinedDate} readOnly/>
            </div>
            <div className="text-center">
                <button className="btn fse-update-button" onClick={updateClickHandler}>UPDATE</button>
                <button className="btn fse-delete-button" onClick={deleteClickHandler}>DELETE</button>
            </div>
        </div>
    )
}

export default UserUpdate;