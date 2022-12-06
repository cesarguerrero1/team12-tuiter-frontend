/*
Cesar Guerrero
11/27/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router"


function UserTable() {

    const {allUsers} = useSelector((state) => state.users);

    const navigate = useNavigate();

    /**
     * When you click on a table row, we are assuming you want to edit that user, therefore this will navigate you to a new screen where you will see all of the data associated with this user! 
     * @param {User} user - The user we wish to edit!
     */
    function userRowClickHandler(user) {
        //Go to the page with this users id! /users/:uid
        navigate(`/admin/home/users/edit/${user._id}`, {state:user});
    }

    return (
        <div className="fse-border py-3 px-2">
            <div className="text-center mb-3">
                <h6>Click on any of the following rows to edit a User</h6>
                <hr className="w-50 m-auto"></hr>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover fse-table-font-size">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            <th>Blocked?</th>
                            <th>Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => {
                            return(
                                <tr key={user._id} className="align-middle" onClick={() => { userRowClickHandler(user) }}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.accountType}</td>
                                    <td>{user.isBlocked ? "TRUE" : "FALSE"}</td>
                                    <td>{user.joinedDate.slice(0, 10)}</td>
                                </tr>
                            )
                        })
                        }   
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default UserTable