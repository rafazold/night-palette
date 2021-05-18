import React from 'react';
import { render } from 'react-dom';
import '../dist/style.css';
import App from './App.jsx';
import './css/_fonts.css';

const root = document.createElement('div');
root.classList.add('font-primary', 'text-base', 'h-screen');
document.body.appendChild(root);

render(<App />, root);
