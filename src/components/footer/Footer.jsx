import React from 'react';
import Heart from '../../assets/images/icons/heart.svg';

const Footer = () => (
  <div className="w-full flex justify-center items-center text-white fixed bottom-0 left-0 py-1 bg-black backdrop-filter backdrop-blur-lg bg-opacity-90">
    Made with <Heart className="h-3 text-button-green mx-2" /> by Gil & Rafa
  </div>
);

export default Footer;
