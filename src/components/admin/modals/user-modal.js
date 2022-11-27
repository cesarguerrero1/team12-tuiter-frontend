/*
Cesar Guerrero
11/26/22
CS55000 - Fall 2022
Team 12 - Final Project

*/

import React from "react";

function UserModal({hideModal, clickOutsideModal}){

    return(
        <div id="userModal" className="modal" onClick={(event) => {clickOutsideModal(event)}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add User</h5>
                        <button className="btn-close" onClick={(event) => { hideModal(event)}}></button>
                    </div>
                    <div className="modal-body">
                        Form elements go here!
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
