/*
Cesar Guerrero
11/27/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

import { useSelector } from "react-redux";
import { useNavigate } from "react-router"

function TuitTable() {

    const { allTuits } = useSelector((state) => state.tuits);

    const navigate = useNavigate();

    /**
     * When you click on a table row, we are assuming you want to edit that Tuit,
     * therefore this will navigate you to a new screen where you will see all of the data associated with this Tuit! 
     * @param {Tuit} tuit - The tuit we wish to edit!
     */
    function tuitRowClickHandler() {
        //Go to the page with this users id! /users/:uid
        navigate("/admin/home/tuits/edit/1");
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
                            <th>Flagged?</th>
                            <th>Blocked?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTuits.map((tuit) => {
                            return (
                                <tr className="align-middle" onClick={() => { tuitRowClickHandler(tuit) }}>
                                    <td>tuit.tuit</td>
                                    <td>tuit.postedOn</td>
                                    <td>tuit.postedBy</td>
                                    <td>tuit.isBlocked</td>
                                    <td>tuit.isFlagged</td>
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