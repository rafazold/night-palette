import React from 'react';

import { firebase, emailProvider, googleProvider } from '../../api/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [googleProvider, emailProvider],
};

const SignIn = () => (
  <div>
    <p>Please sign-in:</p>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </div>
);

export default SignIn;
