import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({ tuit, deleteTuit }) => {
  return (!tuit.isBlocked &&
    <div className="ttr-tuit rounded-0 list-group-item ">
      <li className="d-flex">
        <div className="pe-2">
          {
            tuit.postedBy &&
            <img alt="User Logo" src={`../images/twitter.jpg`} className="ttr-tuit-avatar-logo rounded-circle" />
          }
        </div>
        <div className="w-100">
          <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>
          <h2 className="fs-5">
            {tuit.postedBy && tuit.postedBy.username}@{tuit.postedBy && tuit.postedBy.username} - {tuit.postedOn.slice(0,10)}
          </h2>
          {tuit.tuit}
          {
            tuit.youtube && <TuitVideo tuit={tuit} />
          }
          {
            tuit.image && <TuitImage tuit={tuit} />
          }
          <TuitStats tuit={tuit} />
        </div>
      </li>
      {tuit.isFlagged && <div className="text-center text-danger"><h6 ><i className="far fa-flag"></i> This Tuit has been flagged by Tuiter Staff!</h6></div>}
    </div>
  );
}
export default Tuit;