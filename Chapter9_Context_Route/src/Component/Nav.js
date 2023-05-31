import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
const navList = [
  {
    to: '/',
    title: 'Home Page',
  },
  {
    to: '/blog',
    title: 'Blog Page',
  },
  {
    to: '/profile',
    title: 'Profile Page',
  },
  {
    to: '/contact',
    title: 'Contact Page',
  },
];
const Nav = () => {
  return (
    <>
      <div className="p-5 bg-purple-500 text-white shadow-lg flex items-center justify-center gap-x-5">
        {navList.map((item, index) => {
          return (
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'text-red-900 bg-white' : ''
              }
              key={index}>
              {item.title}
            </NavLink>
          );
        })}
        {/* <NavLink
        to={'/'}
        className={({ isActive }) => (isActive ? 'text-red-900 bg-white' : '')}>
        Home
      </NavLink>
      <NavLink
        to={'/blog'}
        className={({ isActive }) => (isActive ? 'text-red-900 bg-white' : '')}>
        Blog
      </NavLink>
      <Link to={'/profile'}>Profile</Link> */}
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Nav;
