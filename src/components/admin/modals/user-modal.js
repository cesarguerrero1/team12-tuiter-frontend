/*
Cesar Guerrero
11/26/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Import Services
import {registerThunk } from "../../../services/users-thunk";

function UserModal({ hideModal, clickOutsideModal }) {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('USER');
    const [maritalStatus, setMaritalStatus] = useState('SINGLE');

    function createUserClickHandler() {
        if(username === "" || password === "" || email === ""){
            alert("Username, password, and email must all contain valid values");
            return
        }
        dispatch(registerThunk({
            username,
            password,
            email,
            accountType,
            maritalStatus
        }))

        document.getElementById('userModal').classList.remove('d-block');
        setUsername('');
        setPassword('');
        setEmail('');
        setAccountType('USER');
        setMaritalStatus('SINGLE');

        
        //We want to force a reload!
        window.location.reload();
        return
    }

    return (
        <div id="userModal" className="modal" onClick={(event) => { clickOutsideModal(event) }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title">Add User</h5>
                        <button className="btn-close" onClick={(event) => { hideModal(event) }}></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className="m-3">
                                <label for="editModalUsername" className="form-label text-start">Username</label>
                                <input type="text" className="form-control" id="editModalUsername" onChange={(event) => { setUsername(event.target.value) }} value={username} />
                            </div>
                            <div className="m-3">
                                <label for="editModalPassword" className="form-label text-start">Password</label>
                                <input type="password" className="form-control" id="editModalPassword" onChange={(event) => { setPassword(event.target.value) }} value={password} />
                            </div>
                            <div className="m-3">
                                <label for="editModalEmail" className="form-label text-start">Email</label>
                                <input type="email" className="form-control" id="editModalEmail" onChange={(event) => { setEmail(event.target.value) }} value={email} />
                            </div>
                            <div className="m-3">
                                <label for="editModalAccountType" className="form-label">Account Type</label>
                                <select id="editModalAccountType" className="form-select" onChange={(event) => { setAccountType(event.target.value) }} >
                                    <option value="USER" selected={accountType === "USER" ? true : false}>USER</option>
                                    <option value="ADMIN" selected={accountType === "ADMIN" ? true : false}>ADMIN</option>
                                </select>
                            </div>
                            <div className="m-3">
                                <label for="editModalMaritalStatus" className="form-label">Marital Status</label>
                                <select id="editModalMaritalStatus" className="form-select" onChange={(event) => { setMaritalStatus(event.target.value) }} >
                                    <option value="SINGLE" selected={maritalStatus === "SINGLE" ? true : false}>SINGLE</option>
                                    <option value="MARRIED" selected={maritalStatus === "MARRIED" ? true : false}>MARRIED</option>
                                    <option value="DIVORCED" selected={maritalStatus === "DIVORCE" ? true : false}>DIVORCED</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className='btn fse-create-button' onClick={createUserClickHandler}>Create User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal;