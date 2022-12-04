/*
Cesar Guerrero
12/4/22
CS5500 - Final 

After meeting with the professor we are going back and retroactively just making sure all of our pull requests are lined up.
*/

import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as userService from "../../services/users-service";
import React from "react";
import {UserList} from "./user-list";

function Login(){
  const [existingUsers, setExistingUsers] = useState([]);

  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});

  const deleteUser = (uid) => userService.deleteUser(uid).then(findAllUsers)
  const findAllUsers = () => userService.findAllUsers().then(users => {setExistingUsers(users)})
  const register = () => userService.createUser(newUser).then(findAllUsers);
  const login = () => userService.findUserByCredentials(loginUser).then((user) => {
        //navigate(`/home/${user._id}`)
  });

  useEffect(findAllUsers, []);
  
  return (
    <div>
      <h1>Register</h1>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setNewUser({...newUser, username: e.target.value})}
             placeholder="username"/>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setNewUser({...newUser, password: e.target.value})}
             placeholder="password" type="password"/>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setNewUser({...newUser, email: e.target.value})}
             placeholder="email" type="email"/>
      <button onClick={register} className="btn btn-primary mb-5">Register
      </button>

      <h1>Login</h1>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setLoginUser({...loginUser, username: e.target.value})}
             placeholder="username"/>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setLoginUser({...loginUser, password: e.target.value})}
             placeholder="password" type="password"/>
      <button onClick={login} className="btn btn-primary mb-5">Login</button>

      <h1>Login As</h1>

      <UserList users={existingUsers} deleteUser={deleteUser}/>

    </div>
  );
};

export default Login;