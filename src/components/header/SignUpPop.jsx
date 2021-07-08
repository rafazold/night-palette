import React, { useState } from 'react';
import User from '../../assets/images/icons/user-Icon.svg';
import Popup from '../shared/Popup';

const SignUpPop = ({ user, signOut, children }) => {
  const [openSignUp, setOpenSignUp] = useState(false);
  return (
    <Popup
      buttonIcon={<User className="w-8 h-8" />}
      open={openSignUp}
      handleOpen={setOpenSignUp}
      className="top-16 right-0 w-96"
    >
      <div
        className={[
          'hidden',
          'lg:block',
          'text-base',
          'px-6',
          'py-4',
          'bg-card-gray',
          'bg-opacity-70',
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
          <a href="mailto:test@example.com">Contact Us</a>
        </div>
      </div>

      <div className="lg:hidden text-base font-medium px-6 py-4 bg-card-gray lg:bg-opacity-70 rounded-md text-light-gray">
        {children}
        <div className="mt-4 text-xs flex underline gap-4">
          <button onClick={signOut}>log out</button>
          <a href="mailto:test@example.com">Contact Us</a>
        </div>
      </div>
    </Popup>
  );
};

export default SignUpPop;
