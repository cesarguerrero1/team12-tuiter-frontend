import React from "react";
import {useLocation, Link} from "react-router-dom";

function Navigation() {
  const {pathname} = useLocation();
  const links = [
    {label: 'Tuiter', icon: 'fa-square-t', path: '/tuiter'},
    {label: 'Home', icon: 'fa-home', path: '/home'},
    {label: 'Explore', icon: 'fa-hashtag', path: '/explore'},
    {label: 'Notifications', icon: 'fa-bell', path: '/notifications'},
    {label: 'Messages', icon: 'fa-envelope', path: '/messages'},
    {label: 'Bookmarks', icon: 'fa-bookmark', path: '/bookmarks'},
    {label: 'Lists', icon: 'fa-list', path: '/lists'},
    {label: 'Profile', icon: 'fa-user', path: '/profile'},
    {label: 'More', icon: 'fa-circle-ellipsis', path: '/more'},
    {label: 'Login', icon: 'fa-user', path: '/login'},
  ];
  return (
    <div className="ttr-navigation">
      <div className="list-group">
        {
          links.map((link, ndx) => {
            return (
              <Link
                to={link.path} id={link.label}
                key={ndx}
                className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
                          ${pathname.indexOf(link.path) >= 0 ? 'active' : ''}`}>
                <i className={`fa ${link.icon} text-center`}></i>
                <span className="ttr-label">{link.label}</span>
              </Link>
            );
          })
        }
      </div>
      <button className="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white">Tuit</button>
    </div>
  );
};

export default Navigation;