import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({ currentUser, tuit, deleteTuit }) => {

  //We updated this to now look to see if a tuit is blocked or if the user who posted it is blocked
  //Notice that we also added functionality for a user being able to delete a Tuit that belongs to them!
  return (
      tuit.postedBy !== null &&
      <div className="ttr-tuit rounded-0 list-group-item ">
          {(tuit.isBlocked || tuit.postedBy.isBlocked) && 
          <div className="text-center text-danger">
              <h6>This Tuit and/or the original user who posted this Tuit have been blocked. The content will not be displayed!</h6>
          </div>
          }
          {!tuit.isBlocked && !tuit.postedBy.isBlocked  && 
          <div>
              <li className="d-flex">
                  <div className="pe-2">
                      <img alt="User Logo" src={`../images/twitter.jpg`} className="ttr-tuit-avatar-logo rounded-circle" />
                  </div>
                  <div className="w-100">
                    {currentUser !== null && currentUser.username === tuit.postedBy.username &&
                        <i onClick={() => deleteTuit(tuit._id)} className="fas fa-times fa-2x fa-pull-right"></i>
                    }
                    <h2 className="fs-5">
                      {tuit.postedBy.username}@{tuit.postedBy.username} - {tuit.postedOn.slice(0,10)}
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
              {tuit.isFlagged && <div className="text-center text-danger"><h6 ><i className="far fa-flag"></i> This Tuit has been flagged by Tuiter Staff for containing false/misleading information!</h6></div>}
          </div>
          }
      </div>
  )
}
export default Tuit;