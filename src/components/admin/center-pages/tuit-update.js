/*
Cesar Guerrero
12/4/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams, useNavigate } from "react-router";

//Thunks!
import {deleteTuitThunk, updateTuitThunk} from "../../../services/tuits-thunk.js"

/**
 * When this function is called, we need to bring up a screen wherein the admin can see all of the data associated with the tuit and can edit/flag/delete it
 * @param {tuit} tuit - The tuit we are going to display information for
 */
function TuitUpdate() {
    const {tid} = useParams();
    const {allTuits} = useSelector(state => state.tuits);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let tuitToEdit = allTuits.find((tuit) => {
        return tuit._id === tid;
    })

    let tuit = {
        tuit: "A Tuit should go here...",
        postedBy: "xcesarguerrero",
        postedOn: "2022-01-04",
        isBlocked: false,
        isFlagged: true,
    }

    const [isBlocked, setIsBlocked] = useState(tuit.isBlocked);
    const [isFlagged, setIsFlagged] = useState(tuit.isFlagged)

    function updateClickHandler(){
        console.log(isBlocked, isFlagged);
        //dispatch(updateTuitThunk())

    }

    function deleteClickHandler(){
        console.log(isBlocked, isFlagged);
        //dispatch(deleteTuitThunk())
    }


    return (
        <div className= "fse-border py-3 px-2">
            <h6 onClick={() => navigate('../tuits')}><i className="fas fa-chevron-left"></i> Return</h6>
            <div className="m-3">
                <label for="editTuit" className="form-label text-start">Tuit (Read Only)</label>
                <input type="text" className="form-control" id="editTuit" value={tuit.tuit} readOnly/>
            </div>
            <div className="m-3">
                <label for="editPostedBy" className="form-label text-start">Posted By (Read Only)</label>
                <input type="text" className="form-control" id="editPostedBy" value={tuit.postedBy} readOnly/>
            </div>
            <div className="m-3">
                <label for="editPostedOn" className="form-label">Post Date (Read Only)</label>
                <input type="date" className="form-control" id="editPostedOn" value={tuit.postedOn} readOnly/>
            </div>
            <div className="m-3">
                <span className="me-3">
                    <input type="checkbox" className="form-check-input me-1" id="tuitEditBlocked" onChange={() => {setIsBlocked(!isBlocked)}} checked={isBlocked === true ? true : false}/>
                    <label for="tuitEditBlocked" className="form-check-label" >Blocked?</label>
                </span>
                <span className="me-3">
                    <input type="checkbox" className="form-check-input me-1" id="tuitEditFlagged" onChange={() => {setIsFlagged(!isFlagged)}} checked={isFlagged === true ? true : false}/>
                    <label for="tuitEditFlagged" className="form-check-label">Admin Permissions?</label>
                </span>
            </div>
            <div className="m-3">
            </div>
            <div className="text-center">
                <button className="btn fse-update-button" onClick={updateClickHandler}>UPDATE</button>
                <button className="btn fse-delete-button" onClick={deleteClickHandler}>DELETE</button>
            </div>
        </div>
    )
}

export default TuitUpdate;