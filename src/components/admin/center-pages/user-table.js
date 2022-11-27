/*
Cesar Guerrero
11/27/22
CS55000 - Fall 2022
Team 12 - Final Project

*/

function UserTable({ users }) {

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Account Type</th>
                        <th>Blocked?</th>
                        <th>Admin?</th>
                        <th>Joined Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="align-middle">
                        <td>xcesarguerrero</td>
                        <td>guerrero.ce@northeastern.edu</td>
                        <td>ADMIN</td>
                        <td>FALSE</td>
                        <td>TRUE</td>
                        <td>11/27/2022</td>
                        <td><button className="btn btn-primary">Edit</button></td>
                        <td><button className="btn btn-primary">Block</button></td>
                        <td><button className="btn btn-primary">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default UserTable