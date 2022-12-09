/*
Cesar Guerrero
11/26/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import Services
import { createTuitThunk } from "../../../services/tuits-thunk";

/**
 * We decided to handle creating a Tuit through a modal. When the admin clicks on the 'Add Tuit' button this JSX element will pop up on the window. If at any point
 * the click off the modal or click on the X button, it will hide the modal
 * @param {Object} parameters This is the syntax for React. We are passing in a 'hideModal' function that alters the display value of the modal. We are also passing in the
 * clickOutsideModal function which is just a fancier way of hiding the modal as well. 
 * @returns - JSX Element
 */
function TuitModal({ hideModal, clickOutsideModal }) {

    //When creating a Tuit everything needs to be attributed to a User/admin
    const {currentUser} = useSelector((state) => state.users);
    const [tuit, setTuit] = useState('');

    const dispatch = useDispatch();

    //When we cick on Create Tuit we want to submit the content of the Tuit. Notice that 
    //we are only asking for the Tuit as the backend will handle setting all the otehr defaults
    function createTuitClickHandler() {
        //Error correction
        if(tuit === ""){
            alert("You need to write content to tuit!");
            return
        }

        dispatch(createTuitThunk({tuit, postedBy: currentUser._id}));

        //Hide the modal and reset the state variables
        document.getElementById('tuitModal').classList.remove('d-block');
        setTuit('');
        
        return
    }

    return (
        <div id="tuitModal" className="modal" onClick={(event) => { clickOutsideModal(event) }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title">Add Tuit</h5>
                        <button className="btn-close" onClick={(event) => { hideModal(event) }}></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className="m-3">
                                <label for="editModalTuit" className="form-label text-start">Tuit</label>
                                <textarea className="form-control" id="editModalTuit" onChange={(event) => { setTuit(event.target.value) }} value={tuit} />
                            </div>
                        </div>
                        <div className="text-center">
                            <button className='btn fse-create-button' onClick={createTuitClickHandler}>Create Tuit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TuitModal;