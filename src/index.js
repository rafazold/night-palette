import React from 'react';
import { render } from 'react-dom';
import '../dist/style.css';
import App from './App.jsx';

const root = document.createElement('div');
document.body.appendChild(root);

render(<App />, root);
