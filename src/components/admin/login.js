/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

//React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Reducers
import { loginThunk } from "../../services/users-thunk";

/**
 * The LoginPage is the gatekepeer for our portal. If a user attempts to access any other page in the admin portal and they are not authorized,
 * they will be redirected to this page!
 * @returns JSX Element for the Admin Login UI
 */
function LoginPage() {

    //Redux State
    const { currentUser, isAdmin, loginAttemptFailed } = useSelector((state) => state.users);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(loginAttemptFailed ? 'The user does not exist or your username/password work incorrect' : '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Notice that there is a timeout function as the reducer needs time to update!
    async function loginClickHandler() {
        if (username === '' || password === '') {
            setErrorMessage("Please input a username and/or password");
        } else {
            setErrorMessage("Attempting to Login...");
            dispatch(loginThunk({ username, password }));
            setTimeout(() => { navigate('/admin/home') }, 1500);
        }
    }

    //If the user is already logged in and an admin, don't let them login again!
    useEffect(() => {
        if(currentUser !== null && isAdmin === true){
            navigate('/admin/home');
        }
    });

    return (
        <div className="col">
            <div className="w-50 m-auto mt-5 py-5 px-3 fse-login-border">
                <div className="text-center">
                    <h5 className="w-75 m-auto">Tuiter Admin Portal</h5>
                    <i className="fab fa-twitter fse-twitter-color fa-2x"></i>
                </div>
                <div>
                    <div className="m-3">
                        <label for="username" className="form-label text-start">Username</label>
                        <input placeholder="Please enter your username..." type="text" className="form-control" id="username" onChange={(event) => { setUsername(event.target.value) }} />
                    </div>
                    <div className="m-3">
                        <label for="password" className="form-label">Password</label>
                        <input placeholder="Please enter your password..." type="password" className="form-control" id="password" onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div id="fse-error-messages" className="text-danger fw-bold text-center m-3">{errorMessage}</div>
                    <div>
                        <button className='btn fse-login-button' onClick={loginClickHandler}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage