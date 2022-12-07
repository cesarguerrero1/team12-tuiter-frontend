import React from "react";

export const UserList = ({users}) => {
  return (
    <div className="list-group">
      {
        users.map(user => {
            return (!user.isBlocked && <span className="fs-3">{user.username}</span> )
        })
      }
    </div>
  )
};
