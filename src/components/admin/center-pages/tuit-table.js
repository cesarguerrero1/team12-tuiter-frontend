/*
Cesar Guerrero
11/27/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import React from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router"


function TuitTable() {

    const { allTuits } = useSelector((state) => state.tuits);

    const navigate = useNavigate();

    /**
     * When you click on a table row, we are assuming you want to edit that Tuit,
     * therefore this will navigate you to a new screen where you will see all of the data associated with this Tuit! 
     * @param {Tuit} tuit - The tuit we wish to edit!
     */
    function tuitRowClickHandler(tuit) {
        //Go to the page with this users id! /users/:uid
        navigate(`/admin/home/tuits/edit/${tuit._id}`, {state:tuit});
    }

    return (
        <div className="fse-border py-3 px-2">
            <div className="text-center mb-3">
                <h6>Click on any of the following rows to edit a Tuit</h6>
                <hr className="w-50 m-auto"></hr>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover fse-table-font-size">
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Posted On</th>
                            <th>Posted By</th>
                            <th>Blocked?</th>
                            <th>Flagged?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTuits.map((tuit) => {
                            return (
                                <tr key={tuit._id} className="align-middle" onClick={() => { tuitRowClickHandler(tuit) }}>
                                    <td>{tuit.tuit}</td>
                                    <td>{tuit.postedOn.slice(0,10)}</td>
                                    {tuit.postedBy !== null ? <td>{tuit.postedBy.username}</td> : <td>NULL</td>}
                                    <td>{tuit.isBlocked ? "TRUE" : "FALSE"}</td>
                                    <td>{tuit.isFlagged ? "TRUE" : "FALSE"}</td>
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

export default TuitTable