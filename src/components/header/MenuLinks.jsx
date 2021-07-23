import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/icons/logo-night-palette.svg';
import Star from '../../assets/images/icons/star.svg';
import context from '../../context/context';

const MenuLinks = ({ className }) => {
  const { activeFilter, setActiveFilter } = useContext(context);
  const history = useHistory();
  const location = useLocation();
  const sendHome = () => {
    setActiveFilter('new');
    history.push('/', { button: 'home' });
  };

  return (
    <ul
      className={[
        'flex-col lg:flex-row lg:space-x-10 font-light max-w-screen-xl my-auto text-2xl lg:text-base',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
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
            setActiveFilter('created');
            location.pathname !== '/personal' && history.push('/personal');
          }}
          className={[
            'text-white',
            'h-10',
            'focus:outline-none',
            'flex items-center',
            (activeFilter === 'created' || activeFilter === 'liked') &&
              'text-button-blue',
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
