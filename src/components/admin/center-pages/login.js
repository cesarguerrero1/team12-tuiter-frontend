/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project

*/

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginThunk } from "../../../services/users-thunk";

function LoginPage(){

    const {currentUser, loginAttemptFailed} = useSelector((state) => state.users);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(loginAttemptFailed ? 'The user does not exist or your username/password work incorrect' : '');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //Notice that there is a timeout function as the reducer needs time to update!
    async function loginClickHandler(){
        if(username === '' || password === ''){
            setErrorMessage("Please input a username and/or password");
        }else{
            setErrorMessage("Attempting to Login...");
            dispatch(loginThunk({username, password}));
            setTimeout(() => {navigate('./home')}, 2000);
        }
    }

    return(
        <div className="col">
            <div className="w-50 m-auto mt-5 py-5 px-3 fse-login-border">
                <h5 className="w-50 m-auto text-center">Tuiter Admin Portal</h5>
                <div>
                    <div className="m-3">
                        <label for="username" className="form-label text-start">Username</label>
                        <input placeholder="Please enter your username" type="text" className="form-control" id="username" onChange={(event) => {setUsername(event.target.value)}}/>
                    </div>
                    <div className="m-3">
                        <label for="password" className="form-label">Password</label>
                        <input placeholder="Please enter your password" type="password" className="form-control" id="password" onChange={(event) => {setPassword(event.target.value)}}/>
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