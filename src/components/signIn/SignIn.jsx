import React, { useEffect, useContext } from 'react';
import context from '../../context/context';
import { useHistory } from 'react-router-dom';
import CheckIcon from '../../assets/images/icons/check-icon.svg';

import { firebase, emailProvider, googleProvider } from '../../api/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
const SignIn = () => {
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [googleProvider, emailProvider],
    callbacks: {
      signInSuccessWithAuthResult(authResult, redirectUrl) {
        setUser(authResult);
      },
    },
  };
  const { user, setUser } = useContext(context); // Local signed-in state.
  const history = useHistory();
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
        user && history.push('/');
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  return (
    <>
      {!user ? (
        <div className="container mx-auto flex flex-col justify-center">
          <div className="lg:w-1/2 text-white mx-auto my-10">
            <p className="text-xl mb-6">
              Login and Start Your Night Palette Experience:
            </p>
            <ul>
              {[
                'Save your favorite palettes.',
                'Like other users palettes',
                'Private page for your added and liked  palettes.',
              ].map((bullet) => (
                <li className="flex items-center">
                  <span className="border border-white mr-2 h-4 w-4 flex justify-center">
                    <CheckIcon className="h-3" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <div className="mt-48 text-white">Already signed in</div>
      )}
    </>
  );
};

export default SignIn;
