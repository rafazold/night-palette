import React from 'react';
import CardList from '../components/card/CardList.jsx';

const Home = () => (
  <div className="comp-home bg-black text-white">
    <div className=" max-w-screen-xl m-auto">
      <h1 className="text-2xl">
        Dark Mode Color Palettes for Designers and Artists
      </h1>
      <h2>
        Night Palette is a free inspirational color palette tool made for dark
        mode design
      </h2>
      <CardList />
    </div>
  </div>
);

export default Home;
