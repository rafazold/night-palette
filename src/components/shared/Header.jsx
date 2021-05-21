import React from 'react';
import logo from '../../assets/images/night-palette-logo.png';
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <header className="comp-header w-full bg-card-gray text-white fixed top-0 flex h-16 z-50 px-4 flex justify-between">
      <ul className="flex space-x-4 font-light max-w-screen-xl my-auto ">
        <li>
          <NavLink to="/" exact activeClassName="text-white h-10">
            <img src={logo} alt="Logo" className="h-6" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" activeClassName="text-white h-10">
            new
          </NavLink>
        </li>
        <NavLink to="/" activeClassName="text-white h-10">
          <li>popular</li>
        </NavLink>
      </ul>
      <NavLink
        to={'/create'}
        className="py-1 px-2 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black text-base"
      >
        + Add Palette
      </NavLink>
    </header>
  );
};

export default Header;
