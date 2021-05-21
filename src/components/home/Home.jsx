import React from 'react';
import CardFeed from './card/CardFeed.jsx';

const Home = () => (
  <div className="comp-home bg-black text-white">
    <div className=" max-w-screen-xl m-auto text-light-gray">
      <div className="mx-4">
        <h1 className="text-2xl pt-9">
          Dark Mode Color Palettes for Designers and Artists
        </h1>
        <h2 className="pb-12">
          Night Palette is a free inspirational color palette tool made for dark
          mode design
        </h2>
      </div>
      <CardFeed />
    </div>
  </div>
);

export default Home;