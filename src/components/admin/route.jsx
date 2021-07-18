import { lazy } from 'react';

export const path = '/admin';
export const exact = true;
export const component = lazy(() => import('./Admin.jsx'));
