import { lazy } from 'react';

export const path = '/signin';
export const exact = true;
export const component = lazy(() => import('./SignIn.jsx'));
