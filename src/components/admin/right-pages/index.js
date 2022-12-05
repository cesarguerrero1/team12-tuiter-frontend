/*
Cesar Guerrero
11/25/22
CS55000 - Fall 2022
Team 12 - Final Project
*/

function AdminStats(){
    return(
        <div className="d-none d-lg-block col-lg-3">
            <div className="fse-stats-border">
                <div className="my-3">
                    <h6 className="m-0">Active Users</h6>
                    <span>1</span>
                </div>
                <hr />
                <div className="my-3">
                    <h6 className="m-0">Blocked Users</h6>
                    <span>1</span>
                </div>
                <hr />
                <div className="my-3">
                    <h6 className="m-0">Tuits</h6>
                    <span>1</span>                   
                </div>
                <hr />
                <div className="my-3">
                    <h6 className="m-0">Blocked Tuits</h6>
                    <span>1</span>                 
                </div>
                <hr />
                <div className="my-3">
                    <h6 className="m-0">Flagged Tuits</h6>
                    <span>1</span>        
                </div>
            </div>
        </div>
    )
}

export default AdminStats