/*
Cesar Guerrero
11/27/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import { Navigate, useNavigate } from "react-router"

function UserTable({ users }) {

    const nvigate = useNavigate();
    /**
     * When you click on a table row, we are assuming you want to edit that user, therefore this will navigate you to a new screen where you will see all of the data associated with this user! 
     * @param {User} user - The user we wish to edit!
     */
    function userRowClickHandler(user){
        //Go to the page with this users id! /users/:uid
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
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
                    <tr className="align-middle" onClick={() => {userRowClickHandler()}}>
                        <td>xcesarguerrero</td>
                        <td>guerrero.ce@northeastern.edu</td>
                        <td>ADMIN</td>
                        <td>FALSE</td>
                        <td>11/27/2022</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default UserTable