import { lazy } from 'react';

export const path = '/personal';
export const exact = true;
export const component = lazy(() => import('./Personal.jsx'));
