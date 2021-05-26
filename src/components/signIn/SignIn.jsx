import React, { useEffect, useContext } from 'react';
import context from '../../context/context';
import { useHistory } from 'react-router-dom';

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
        console.log('heeeey', user);
        setUser(user);
        user && history.push('/');
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <>
      {!user ? (
        <div>
          <p>Please sign-in:</p>
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
