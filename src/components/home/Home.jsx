import React, { useEffect, useState } from 'react';
import CardFeed from '../shared/CardFeed.jsx';
import CardPlaceholder from '../shared/CardPlaceholder';

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="comp-home bg-black text-white">
      <div className="container m-auto text-light-gray">
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
  );
};

export default Home;
