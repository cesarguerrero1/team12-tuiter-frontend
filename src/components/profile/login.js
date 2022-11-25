/*
 * Cesar Guerrero
 * 11/24/22
 * Team 12 - CS5500 Final
 */

//Importing React items
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";

//Import our Thunk
import { findAllUsersThunk, registerThunk, loginThunk} from "../../services/users-thunk";

import {UserList} from "./user-list";

function Login(){
  //We need to take advantage of our reducer here
  const {allUsers, currentUser} = useSelector((state) => {return state.users});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});

  function registerClickHandler(){
      dispatch(registerThunk(newUser));
  }

  function LoginClickHandler(){
      dispatch(loginThunk(newUser));
      navigate("/profile");
      
  }

  useEffect(() => {
    dispatch(findAllUsersThunk);
  }, [dispatch])


  return (
    <div>
      <h1>Register</h1>
      <input className="mb-2 form-control" onChange={(e) => setNewUser({...newUser, username: e.target.value})} placeholder="username"/>
      <input className="mb-2 form-control" onChange={(e) => setNewUser({...newUser, password: e.target.value})} placeholder="password" type="password"/>
      <input className="mb-2 form-control" onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="email" type="email"/>
      <button onClick={registerClickHandler} className="btn btn-primary mb-5">Register</button>

      {
        !currentUser &&
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control" onChange={(e) => setLoginUser({...loginUser, username: e.target.value})} placeholder="username"/>
            <input className="mb-2 form-control" onChange={(e) => setLoginUser({...loginUser, password: e.target.value})} placeholder="password" type="password"/>
            <button onClick={LoginClickHandler} className="btn btn-primary mb-5">Login</button>
        </div>
      }

      <h1>Current Database Users</h1>
      <UserList users={allUsers}/>

    </div>
  );
};

export default Login;