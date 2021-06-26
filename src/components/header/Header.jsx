import React, { useEffect, useContext, useState, useRef } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import context from '../../context/context';
import { firebase } from '../../api/firebase';
import Star from '../../assets/images/icons/star.svg';
import Logo from '../../assets/images/icons/logo-night-palette.svg';
import Moon from '../../assets/images/icons/moon-icon.svg';
import { toast } from 'react-toastify';
import SignUpPop from './SignUp';

const Header = () => {
  const { setUser, user, activeFilter, setActiveFilter } = useContext(context);
  const history = useHistory();
  const location = useLocation();
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
        <ul className="hidden lg:flex space-x-4 font-light max-w-screen-xl my-auto ">
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="text-white"
              className="flex flex-col justify-center h-10"
            >
              <Logo className="h-6 text-white hover:text-button-blue" />
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveFilter('new');
                location.pathname !== '/' && history.push('/');
              }}
              className={[
                'text-white',
                'h-10',
                'focus:outline-none',
                activeFilter === 'new' && 'text-button-blue',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              New
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveFilter('popular');
                location.pathname !== '/' && history.push('/');
              }}
              className={[
                'text-white',
                'h-10',
                'focus:outline-none',
                'flex items-center',
                activeFilter === 'popular' && 'text-button-blue',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Star
                className={['w-3', 'h-3', 'mr-1'].filter(Boolean).join(' ')}
              />
              Popular
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveFilter('user');
                location.pathname !== '/personal' && history.push('/personal');
              }}
              className={[
                'text-white',
                'h-10',
                'focus:outline-none',
                'flex items-center',
                activeFilter === 'user' && 'text-button-blue',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              My Palettes
            </button>
          </li>
        </ul>
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
            <>
              <NavLink
                to={'/create'}
                className="w-10 lg:w-auto h-10 leading-10 text-center text-3xl px-2 font-bold lg:h-auto lg:py-1 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black lg:font-normal lg:text-xs lg:text-sm"
              >
                + <span className="hidden lg:inline">Add Palette</span>
              </NavLink>
              <SignUpPop signOut={signOut} user={user} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
