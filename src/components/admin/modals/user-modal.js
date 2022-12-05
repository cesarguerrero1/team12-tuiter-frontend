/*
Cesar Guerrero
11/26/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, { useState } from "react";

function UserModal({ hideModal, clickOutsideModal }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    function createUserClickHandler() {
        console.log(username, password, email, firstname, lastname);
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
                                <label for="firstname" className="form-label text-start">First Name</label>
                                <input type="text" className="form-control" id="firstname" onChange={(event) => { setFirstname(event.target.value) }} />
                            </div>
                            <div className="m-3">
                                <label for="lastname" className="form-label text-start">Last Name</label>
                                <input type="text" className="form-control" id="lastname" onChange={(event) => { setLastname(event.target.value) }} />
                            </div>
                            <div className="m-3">
                                <label for="email" className="form-label text-start">Email</label>
                                <input type="email" className="form-control" id="email" onChange={(event) => { setEmail(event.target.value) }} />
                            </div>
                            <div className="m-3">
                                <label for="givenPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="givenPassword" onChange={(event) => { setPassword(event.target.value) }} />
                            </div>
                            <div>
                                <button className='btn fse-login-button' onClick={createUserClickHandler}>Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button>Add User</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal;