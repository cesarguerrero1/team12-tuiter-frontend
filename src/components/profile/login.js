/*
Cesar Guerrero
12/4/22
CS5500 - Final 

After meeting with the professor we are going back and retroactively just making sure all of our pull requests are lined up.
*/
//Import React Items
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Import Thunk
import { findAllUsersThunk, registerThunk, loginThunk } from "../../services/users-thunk";

//Import Other
import { UserList } from "./user-list";

function Login() {
  //We need to take advantage of our reducer here
  const { allUsers, currentUser } = useSelector((state) => { return state.users });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});

  function registerClickHandler() {
    dispatch(registerThunk(newUser));
  }

  function loginClickHandler() {
    dispatch(loginThunk(newUser));
    navigate("/profile");

  }

  useEffect(() => {
    dispatch(findAllUsersThunk);
  }, [dispatch])

  return (
    <div>
      <h1>Register</h1>
      <input className="mb-2 form-control" onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="username" />
      <input className="mb-2 form-control" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="password" type="password" />
      <input className="mb-2 form-control" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="email" type="email" />
      <button onClick={registerClickHandler} className="btn btn-primary mb-5">Register</button>
      {
        !currentUser &&
        <div>
          <h1>Login</h1>
          <input className="mb-2 form-control" onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })} placeholder="username" />
          <input className="mb-2 form-control" onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} placeholder="password" type="password" />
          <button onClick={loginClickHandler} className="btn btn-primary mb-5">Login</button>

        </div>
      }
      <h1>Current Users in Database</h1>
      <UserList users={allUsers}/>
    </div>
  );
};

export default Login;