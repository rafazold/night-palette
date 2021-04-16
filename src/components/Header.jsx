import React from 'react';
import logo from '../images/night-palette-logo.png';
import {NavLink} from 'react-router-dom'

const Header = () => (
  <header className="comp-header w-full bg-card-gray text-white fixed top-0 flex h-16 z-50">
    <ul className="flex space-x-4 font-bold mb-4 max-w-screen-xl w-full m-auto ">
      <li>
        <NavLink to="/" exact activeClassName="text-white h-10">
          <img src={logo} alt="Logo" className='h-6' />
        </NavLink>
      </li>
      <li>
        <NavLink to="/create" activeClassName="text-white h-10">
          new
        </NavLink>
      </li>
      <li>
          popular
      </li>
    </ul>
    <form onSubmit={(e) => {{
      alert('hello1')
      e.preventDefault}}} >
      <input type="text" value=""/>
      <button type="submit"/>
    </form>
  </header>
);

export default Header;
