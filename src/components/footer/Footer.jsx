import React from 'react';
import Heart from '../../assets/images/icons/heart.svg';

const Footer = () => (
  <div className="w-full flex justify-center items-center text-white fixed bottom-0 left-0 py-1 bg-black backdrop-filter backdrop-blur-lg bg-opacity-90 font-light">
    Made with <Heart className="h-3 text-button-green mx-2" /> by
    <a
      href="https://www.linkedin.com/in/finkelsteingil/"
      target="_blank"
      className="mx-1 text-button-green"
    >
      Gil
    </a>{' '}
    &
    <a
      href="https://www.linkedin.com/in/rafa-zoldan/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BQgKAnVvKT0WukK6%2FPKDbMw%3D%3D"
      target="_blank"
      className="mx-1 text-button-green"
    >
      Rafa
    </a>
  </div>
);

export default Footer;
