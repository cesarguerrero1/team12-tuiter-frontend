import React from "react";
import Tuit from "./tuit";

function Tuits({currentUser, tuits = [], deleteTuit}) {

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id} currentUser={currentUser} deleteTuit={deleteTuit} tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;