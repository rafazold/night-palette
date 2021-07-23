import React, { useState } from 'react';
import User from '../../assets/images/icons/user-Icon.svg';
import Popup from '../shared/Popup';
import { useLocation } from 'react-router-dom';

const SignUpPop = ({ user, signOut }) => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const location = useLocation();
  return (
    <Popup
      buttonIcon={
        <User className="w-8 h-8 pointer-events-none" data-button="login" />
      }
      open={openSignUp}
      handleOpen={setOpenSignUp}
      className="top-16 right-0 w-80 transform translate-x-1/10"
      dataButton="login"
      key="login"
      buttonClassName={[
        openSignUp && 'shadow-turquoise',
        'rounded-full',
        'focus:outline-none',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'text-base',
          'px-6',
          'py-4',
          'bg-card-gray',
          'backdrop-filter backdrop-blur-lg bg-opacity-90',
          'rounded-md',
          'text-light-gray',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <p>
          Welcome <span>{user.displayName}</span>
        </p>
        <p>You can start saving, creating, and enjoy new palettes.</p>
        <p>Have fun and be productive.</p>
        <div className="mt-4 text-xs flex underline gap-4">
          <button onClick={signOut}>log out</button>
          <a href="mailto:nightpalettecolors@gmail.com">Contact Us</a>
        </div>
      </div>
    </Popup>
  );
};

export default SignUpPop;
