import React, { useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/icons/logo-night-palette.svg';
import Star from '../../assets/images/icons/star.svg';
import context from '../../context/context';

const MenuLinks = ({ className }) => {
  const { activeFilter, setActiveFilter } = useContext(context);
  const history = useHistory();
  const location = useLocation();

  return (
    <ul
      className={[
        'flex-col lg:flex-row lg:space-x-4 font-light max-w-screen-xl my-auto text-2xl lg:text-base',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <li className="hidden lg:block">
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
          <Star className={['w-3', 'h-3', 'mr-1'].filter(Boolean).join(' ')} />
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
  );
};

export default MenuLinks;
