import { lazy } from 'react';

export const path = '/s/:hex';
export const exact = true;
export const component = lazy(() => import('./Search.jsx'));
