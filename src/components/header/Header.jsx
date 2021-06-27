import React, { useEffect, useContext, useState, useRef } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import context from '../../context/context';
import { firebase } from '../../api/firebase';
import Moon from '../../assets/images/icons/moon-icon.svg';
import { toast } from 'react-toastify';
import SignUpPop from './SignUp';
import MenuLinks from './MenuLinks';

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

  return (
    <header className="w-full flex items-center bg-card-gray text-white fixed top-0 left-0 h-16 z-50 backdrop-filter backdrop-blur-lg bg-opacity-50">
      <div className="comp-header w-full flex px-4 flex justify-between container mx-auto">
        <NavLink to="/" exact className="lg:hidden">
          <div className="flex text-3xl font-black items-center">
            <Moon className="lg:hidden h-6 text-white mr-2" />
            NP
          </div>
        </NavLink>
        <MenuLinks className="hidden lg:flex" />
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <button
                className="py-1 px-2 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black text-xs focus:outline-none lg:text-sm"
                onClick={() => {
                  toast.dark('Please login to add palettes', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }}
              >
                + <span className="hidden lg:inline">Add Palette</span>
              </button>
              <NavLink to="/signin" activeClassName="text-white ">
                Sign-In / Log-In
              </NavLink>
            </>
          ) : (
            <div className="flex items-center">
              <NavLink
                to={'/create'}
                className="h-8 w-8 leading-8 text-center text-3xl px-2 font-bold mr-2 lg:w-auto lg:h-auto lg:py-1 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black lg:font-normal lg:text-sm"
              >
                <span className="">+</span>{' '}
                <span className="hidden lg:inline">Add Palette</span>
              </NavLink>
              <SignUpPop signOut={signOut} user={user}>
                <MenuLinks className="flex lg:hidden" />
              </SignUpPop>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
