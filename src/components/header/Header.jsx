import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import context from '../../context/context';
import { firebase } from '../../api/firebase';
import Moon from '../../assets/images/icons/moon-icon.svg';
import SearchIcon from '../../assets/images/icons/search-icon.svg';
import { toast } from 'react-toastify';
import SignUpPop from './SignUpPop';
import MenuLinks from './MenuLinks';
import ColorsBar from './ColorsBar';
import UserIcon from '../../assets/images/icons/user-icon-gray.svg';
import MenuIcon from '../../assets/images/icons/menu-icon.svg';
import Popup from '../shared/Popup';
import Button from '../shared/Button';
import Logo from '../../assets/images/icons/logo-night-palette.svg';

const Header = () => {
  const { setUser, user, setActiveFilter } = useContext(context);
  const history = useHistory();
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const sendHome = () => {
    setActiveFilter('new');
    history.push('/', { button: 'home' });
  };

  return (
    <header className="comp-header flex flex-col bg-card-gray text-white fixed top-0 left-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-50 w-full">
      <div className="w-full flex items-center py-4 h-16 container mx-auto">
        <div className="w-full px-4 flex justify-between items-center">
          <button
            onClick={sendHome}
            className="focus:outline-none rounded-md px-1"
          >
            <div className="lg:hidden flex text-3xl font-black items-center">
              <Moon className="h-6 text-white mr-2" />
              NP
            </div>
            <Logo className="hidden lg:block h-6 text-white hover:text-button-blue" />
          </button>
          <MenuLinks className="hidden lg:flex" />
          <div className="flex items-center gap-2">
            <Button
              active={openSearch || location.pathname.split('/')[1] === 's'}
              data-button="search"
              onClick={() => {
                setOpenSearch((open) => {
                  return !open;
                });
              }}
            >
              <span data-button="search" className="hidden lg:block">
                Search
              </span>
              <SearchIcon
                data-button="search"
                className="h-4 w-4 text-black lg:hidden"
              />
            </Button>
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
                <NavLink
                  to="/signin"
                  activeClassName="text-white rounded-full shadow-turquoise"
                  data-button="login"
                >
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
                <SignUpPop signOut={signOut} user={user} data-button="login" />
              </>
            )}
            <Popup
              buttonIcon={
                <MenuIcon
                  className="h-4 w-4 pointer-events-none"
                  data-button="menu"
                />
              }
              open={openMenu}
              handleOpen={setOpenMenu}
              buttonClassName={[
                'lg:hidden',
                'p-2',
                'rounded-md',
                'bg-gradient-to-r',
                'from-button-green',
                'to-button-blue',
                'focus:outline-none',
                openMenu && 'shadow-turquoise',
              ]
                .filter(Boolean)
                .join(' ')}
              className="top-16 right-0 w-56 bg-card-gray backdrop-filter backdrop-blur-lg bg-opacity-90 p-4 rounded-md"
              dataButton="menu"
            >
              <MenuLinks className="flex lg:hidden" />
            </Popup>
          </div>
        </div>
      </div>
      <ColorsBar
        handleShow={setOpenSearch}
        show={openSearch}
        className={[
          'container mx-auto',
          'transform transition-all ease-linear duration-500',
          'overflow-hidden lg:overflow-visible',
          openSearch ? 'opacity-100' : 'h-0 opacity-0',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </header>
  );
};

export default Header;
