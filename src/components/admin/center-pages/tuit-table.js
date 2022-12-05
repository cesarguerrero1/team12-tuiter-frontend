/*
Cesar Guerrero
11/27/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

function TuitTable({tuits}){

    return(
        <div className="table-responsive fse-border">
            <table className="table table-striped table-hover">
                <thead>
                    <th>Message</th>
                    <th>Posted On</th>
                    <th>Posted By</th>
                    <th>Like Count</th>
                    <th>Dislike Count</th>
                </thead>
                <tbody>
                    <tr className="align-middle">
                        <td>Sample String</td>
                        <td>11/27/2022</td>
                        <td>Username(#ID: someNumber)</td>
                        <td>2147</td>
                        <td>10</td>
                        <td><button className="btn btn-primary">Edit</button></td>
                        <td><button className="btn btn-primary">Block</button></td>
                        <td><button className="btn btn-primary">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default TuitTable