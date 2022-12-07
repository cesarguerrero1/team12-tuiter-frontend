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
import { findAllUsersThunk, loginThunk, logoutThunk} from "../../services/users-thunk";

//Import Other
import { UserList } from "./user-list";

function Login() {
  //We need to take advantage of our reducer here
  const { allUsers, currentUser } = useSelector((state) => { return state.users });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({});

  function loginClickHandler() {
    dispatch(loginThunk(loginUser));
    setTimeout(() => {navigate("/home")}, 1500)
  }

  function logoutClickHandler(){
    dispatch(logoutThunk());
  }

  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, [dispatch])

  return (
    <div>
      {
        !currentUser &&
        <div>
          <h1>Login</h1>
          <input className="mb-2 form-control" onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })} placeholder="username" />
          <input className="mb-2 form-control" onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} placeholder="password" type="password" />
          <button onClick={loginClickHandler} className="btn btn-primary mb-5">Login</button>

        </div>
      }
      {currentUser &&
        <div className="my-3">
          <h5>Currently Logged In User: {currentUser.username}</h5>
          <button className="btn fse-logout-button" onClick={logoutClickHandler}>Logout</button>
        </div>
      }
      <h2>Valid Users in Database</h2>
      <UserList users={allUsers}/>
    </div>
  );
};

export default Login;