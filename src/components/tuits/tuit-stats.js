import React from "react";

function TuitStats({tuit}){

  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-envelope fa-fw me-1"></i>
        {tuit.stats.replies}
      </div>
      <div className="col">
        <i className="fas fa-retweet fa-fw me-1"></i>
        {tuit.stats.retuits}
      </div>
      <div className="col">
        <i className="far fa-heart fa-fw me-1"></i>
        {tuit.stats.likes}
      </div>
      <div className="col">
        <i className="fas fa-share fa-fw"></i>
      </div>
    </div>
  );
}

export default TuitStats;