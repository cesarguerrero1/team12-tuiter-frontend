/*
Cesar Guerrero
12/4/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation} from "react-router";

//Thunks!
import { deleteTuitThunk, updateTuitThunk } from "../../../services/tuits-thunk.js"

/**
 * When this function is called, we need to bring up a screen wherein the admin can see all of the data associated with the tuit and can edit/flag/delete it
 * @param {tuit} tuit - The tuit we are going to display information for
 */
function TuitUpdate() {
    const tuitToEdit = useLocation().state;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //We can immediately set this as the state we are using is passing immedaitely. It is not asynchronous
    const [isBlocked, setIsBlocked] = useState(tuitToEdit.isBlocked);
    const [isFlagged, setIsFlagged] = useState(tuitToEdit.isFlagged);

    //When you click on update tuit we need to call our Thunk with the appropriate changes
    function updateClickHandler(tuitToEdit) {
        //THe admin should only be allowed to block or flag a Tuit via update. The admin has no power to alter content
        dispatch(updateTuitThunk({
            ...tuitToEdit,
            isBlocked,
            isFlagged
        }))
        //Async doesn't happen instantaneously so putting a small delay
        setTimeout(()=> navigate("../tuits"), 1500);
        return
    }

    //Handle the action of deleting a Tuit
    function deleteClickHandler(tuitToEdit) {
        dispatch(deleteTuitThunk(tuitToEdit._id))
        setTimeout(()=> navigate("../tuits"), 1500);
        return
    }

    return (
        <div className="fse-border py-3 px-2">
            {tuitToEdit &&
                <div>
                    <h6 onClick={() => navigate('../tuits')}><i className="fas fa-chevron-left"></i> Return</h6>
                    <div className="m-3">
                        <label for="editTuit" className="form-label text-start">Tuit (Read Only)</label>
                        <input type="text" className="form-control" id="editTuit" value={tuitToEdit.tuit} readOnly />
                    </div>
                    <div className="m-3">
                        <label for="editPostedBy" className="form-label text-start">Posted By (Read Only)</label>
                        <input type="text" className="form-control" id="editPostedBy" value={tuitToEdit.postedBy !== null ? tuitToEdit.postedBy.username : "NULL"} readOnly />
                    </div>
                    <div className="m-3">
                        <label for="editPostedOn" className="form-label">Post Date (Read Only)</label>
                        <input type="date" className="form-control" id="editPostedOn" value={tuitToEdit.postedOn.slice(0,10)} readOnly />
                    </div>
                    <div className="m-3">
                        <span className="me-3">
                            <input type="checkbox" className="form-check-input me-1" id="tuitEditBlocked" onChange={() => { setIsBlocked(!isBlocked) }} checked={isBlocked === true ? true : false} />
                            <label for="tuitEditBlocked" className="form-check-label">Blocked?</label>
                        </span>
                        <span className="me-3">
                            <input type="checkbox" className="form-check-input me-1" id="tuitEditFlagged" onChange={() => { setIsFlagged(!isFlagged) }} checked={isFlagged === true ? true : false} />
                            <label for="tuitEditFlagged" className="form-check-label">Flagged?</label>
                        </span>
                    </div>
                    <div className="m-3">
                    </div>
                    <div className="text-center">
                        <button className="btn fse-update-button" onClick={() => {updateClickHandler(tuitToEdit)}}>UPDATE</button>
                        <button className="btn fse-delete-button" onClick={() => {deleteClickHandler(tuitToEdit)}}>DELETE</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default TuitUpdate;