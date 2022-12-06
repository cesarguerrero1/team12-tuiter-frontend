/*
Cesar Guerrero
12/4/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation} from "react-router";

//Import services
import { deleteUserThunk, updateUserThunk } from "../../../services/users-thunk.js";

/**
 * When this function is called, we need to bring up a screen wherein the admin can see all of the data associated with the user and edit/block/delete them
 * @param {user} user - The user we are going to display information for
 */
function UserUpdate() {
    const userToEdit = useLocation().state;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState(userToEdit.username);
    const [email, setEmail] = useState(userToEdit.email);
    const [accountType, setAccountType] = useState(userToEdit.accountType);
    const [maritalStatus, setMaritalStatus] = useState(userToEdit.maritalStatus);
    const [isBlocked, setIsBlocked] = useState(userToEdit.isBlocked);
    const [isAdmin, setIsAdmin] = useState(userToEdit.isAdmin)

    function updateClickHandler(userToEdit) {
        dispatch(updateUserThunk({
            ...userToEdit,
            username,
            email,
            accountType,
            maritalStatus,
            isBlocked,
            isAdmin
        }))
        setTimeout(()=> navigate("../users"), 1500);
        return
    }

    function deleteClickHandler(userToEdit) {
        dispatch(deleteUserThunk(userToEdit._id));
        setTimeout(()=> navigate("../users"), 1500);
        return
    }

    return (
        <div className="fse-border py-3 px-2">
            {userToEdit &&
                <div>
                    <h6 onClick={() => navigate('../users')}><i className="fas fa-chevron-left ms-3"></i> Return</h6>
                    <div className="m-3">
                        <label for="editUsername" className="form-label text-start">Username</label>
                        <input type="text" className="form-control" id="editUsername" onChange={(event) => { setUsername(event.target.value) }} value={username} />
                    </div>
                    <div className="m-3">
                        <label for="editEmail" className="form-label text-start">Email</label>
                        <input type="email" className="form-control" id="editEmail" onChange={(event) => { setEmail(event.target.value) }} value={email} />
                    </div>
                    <div className="m-3">
                        <label for="editPassword" className="form-label">Password Hash (Read Only)</label>
                        <input type="text" className="form-control" id="editPassword" value={userToEdit.passwordHash} readOnly />
                    </div>
                    <div className="m-3">
                        <label for="editAccountType" className="form-label">Account Type</label>
                        <select id="editAccountType" className="form-select" onChange={(event) => { setAccountType(event.target.value) }} >
                            <option value="USER" selected={accountType === "USER" ? true : false}>USER</option>
                            <option value="ADMIN" selected={accountType === "ADMIN" ? true : false}>ADMIN</option>
                        </select>
                    </div>
                    <div className="m-3">
                        <label for="editMaritalStatus" className="form-label">Marital Status</label>
                        <select id="editMaritalStatus" className="form-select" onChange={(event) => { setMaritalStatus(event.target.value) }} >
                            <option value="SINGLE" selected={maritalStatus === "SINGLE" ? true : false}>SINGLE</option>
                            <option value="MARRIED" selected={maritalStatus === "MARRIED" ? true : false}>MARRIED</option>
                            <option value="DIVORCED" selected={maritalStatus === "DIVORCE" ? true : false}>DIVORCED</option>
                        </select>
                    </div>
                    <div className="m-3">
                        <span className="me-3">
                            <input type="checkbox" className="form-check-input me-1" id="editBlocked" onChange={() => { setIsBlocked(!isBlocked) }} checked={isBlocked === true ? true : false} />
                            <label for="editBlocked" className="form-check-label" >Blocked?</label>
                        </span>
                        <span className="me-3">
                            <input type="checkbox" className="form-check-input me-1" id="editAdmin" onChange={() => { setIsAdmin(!isAdmin) }} checked={isAdmin === true ? true : false} />
                            <label for="editAdmin" className="form-check-label">Admin Permissions?</label>
                        </span>
                    </div>
                    <div className="m-3">
                        <label for="editJoinDate" className="form-label">Joined Date (Read Only)</label>
                        <input type="date" className="form-control" id="editJoinDate" value={userToEdit.joinedDate.slice(0, 10)} readOnly />
                    </div>
                    <div className="text-center">
                        <button className="btn fse-update-button" onClick={() => updateClickHandler(userToEdit)}>UPDATE</button>
                        <button className="btn fse-delete-button" onClick={() => deleteClickHandler(userToEdit)}>DELETE</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserUpdate;