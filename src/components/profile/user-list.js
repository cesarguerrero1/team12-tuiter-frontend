import React from "react";

export const UserList = ({users}) => {
  return (
      <div className="list-group">
      {
          users.map(user => {
              return (
                  <span className="list-group-item fs-3">{user.username}</span>
              )
          })
      }
      </div>
    )
};
