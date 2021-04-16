import {lazy} from 'react';

export const path = '/create';
export const exact = true;
export const component = lazy(() => import('./Create.jsx'))
