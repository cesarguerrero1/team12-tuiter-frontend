import React from "react";

export const UserList = ({users}) => {
  return (
    <div className="list-group">
        {
          users.map(user => {
              return (!user.isBlocked && <li key={user._id} className="fs-5">{user.username}</li> )
          })
        }
    </div>
  )
};
