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

function TuitModal({ hideModal, clickOutsideModal }) {

    const {currentUser} = useSelector((state) => state.users);

    const dispatch = useDispatch();

    const [tuit, setTuit] = useState('');

    function createTuitClickHandler() {
        if(tuit === ""){
            alert("You need to write content to tuit!");
            return
        }

        dispatch(createTuitThunk({tuit, postedBy: '638ea305ac6909770cce5010'}));
        document.getElementById('tuitModal').classList.remove('d-block');
        setTuit('');
        //We need to refresh this as we can't directly get the user object when we first create our Tuit
        window.location.reload();
        
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