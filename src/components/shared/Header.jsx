import React, { useEffect, useContext } from 'react';
import logo from '../../assets/images/night-palette-logo.png';
import { NavLink } from 'react-router-dom';
import context from '../../context/context';
import { firebase } from '../../api/firebase';
import { getPalettes, setPalette } from '../../api/api';

const Header = () => {
  const { setUser, user } = useContext(context);
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <header className="w-full flex items-center bg-card-gray text-white fixed top-0 left-0 h-16 z-50 backdrop-filter backdrop-blur-lg bg-opacity-50">
      <div className="comp-header w-full flex px-4 flex justify-between container mx-auto">
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
          <li>
            <NavLink to="/" activeClassName="text-white h-10">
              popular
            </NavLink>
          </li>
          <li>
            <button onClick={() => setPalette('test1234', { merge: true })}>
              set
            </button>
          </li>
          <li>
            <button onClick={getPalettes}>get</button>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <NavLink
            to={'/create'}
            className="py-1 px-2 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black text-xs lg:text-base"
          >
            + Add Palette
          </NavLink>
          {!user ? (
            <NavLink to="/signin" activeClassName="text-white ">
              Sign-In / Log-In
            </NavLink>
          ) : (
            <button onClick={signOut}>Sign Out</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
