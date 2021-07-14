import React, { useContext, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import context from '../../context/context';
import { firebase } from '../../api/firebase';
import Moon from '../../assets/images/icons/moon-icon.svg';
import SearchIcon from '../../assets/images/icons/search-icon.svg';
import { toast } from 'react-toastify';
import SignUpPop from './SignUpPop';
import MenuLinks from './MenuLinks';
import ColorsBar from './ColorsBar';
import UserIcon from '../../assets/images/icons/user-Icon.svg';

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
  const [openSearch, setOpenSearch] = useState(false);
  let location = useLocation();

  return (
    <header className="flex flex-col bg-card-gray text-white fixed top-0 left-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-50 w-full">
      <div className="w-full flex items-center h-16 container mx-auto">
        <div className="comp-header w-full flex px-4 flex justify-between items-center">
          <NavLink to="/" exact className="lg:hidden">
            <div className="flex text-3xl font-black items-center">
              <Moon className="lg:hidden h-6 text-white mr-2" />
              NP
            </div>
          </NavLink>
          <MenuLinks className="hidden lg:flex" />
          <div className="flex items-center gap-2">
            <button
              data-button="true"
              onClick={() => {
                setOpenSearch((open) => {
                  return !open;
                });
              }}
              className={[
                'py-2',
                'lg:py-1',
                'px-2',
                'my-auto',
                'rounded-lg',
                'bg-gradient-to-r',
                'from-button-green',
                'to-button-blue',
                'text-black',
                'text-xs',
                'focus:outline-none',
                'lg:text-sm',
                location.pathname.split('/')[1] === 's' && 'shadow-turquoise',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span data-button="true" className="hidden lg:block">
                Search
              </span>
              <SearchIcon
                data-button="true"
                className="h-4 w-4 text-black lg:hidden"
              />
            </button>
            {!user ? (
              <>
                <button
                  className="h-8 w-8 leading-8 text-center text-3xl px-2 font-bold mr-2 lg:w-auto lg:h-auto lg:py-1 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black lg:font-normal lg:text-sm"
                  onClick={() => {
                    toast.dark('Please login to add palettes', {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                  }}
                >
                  <span className="flex justify-center items-center lg:inline">
                    +
                  </span>
                  <span className="hidden lg:inline">Add Palette</span>
                </button>
                <NavLink to="/signin" activeClassName="text-white ">
                  <UserIcon className="w-8 h-8" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={'/create'}
                  className="h-8 w-8 leading-8 text-center text-3xl px-2 font-bold mr-2 lg:w-auto lg:h-auto lg:py-1 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black lg:font-normal lg:text-sm"
                  activeClassName={[
                    location.pathname === '/create' && 'shadow-turquoise',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="flex justify-center items-center lg:inline">
                    +
                  </span>
                  <span className="hidden lg:inline ml-2">Add Palette</span>
                </NavLink>
                <SignUpPop signOut={signOut} user={user}>
                  <MenuLinks className="flex lg:hidden" />
                </SignUpPop>
              </>
            )}
          </div>
        </div>
      </div>
      <ColorsBar
        handleShow={setOpenSearch}
        className={[
          'container mx-auto',
          'transform transition-all ease-linear duration-300',
          'overflow-hidden lg:overflow-visible',
          openSearch ? 'lg:h-10 opacity-100 pb-10' : 'h-0 opacity-0',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </header>
  );
};

export default Header;
