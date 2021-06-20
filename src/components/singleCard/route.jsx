import { lazy } from 'react';

export const path = '/card/:id';
export const exact = true;
export const component = lazy(() => import('./SingleCard.jsx'));
