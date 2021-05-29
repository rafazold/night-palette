import React, { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import context from '../../context/context';
import { firebase } from '../../api/firebase';
import Star from '../../assets/images/icons/star.svg';
import Logo from '../../assets/images/icons/logo-night-palette.svg';
import { toast } from 'react-toastify';

const Header = () => {
  const { setUser, user, activeFilter, setActiveFilter } = useContext(context);
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
            <NavLink
              to="/"
              exact
              activeClassName="text-white h-10"
              className="flex flex-col justify-center"
            >
              <Logo className="h-6 text-white hover:text-button-blue" />
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveFilter('new');
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
              new
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveFilter('popular');
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
              popular
            </button>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <button
                className="py-1 px-2 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black text-xs focus:outline-none lg:text-base"
                onClick={() => {
                  toast.dark('Please login to add palettes', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }}
              >
                + Add Palette
              </button>
              <NavLink to="/signin" activeClassName="text-white ">
                Sign-In / Log-In
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={'/create'}
                className="py-1 px-2 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black text-xs lg:text-base"
              >
                + Add Palette
              </NavLink>
              <button onClick={signOut}>Sign Out</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
