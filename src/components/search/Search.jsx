import React, { useContext, useEffect } from 'react';
import CardFeed from '../shared/CardFeed.jsx';
import context from '../../context/context';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { setActiveFilter } = useContext(context);
  const { hex } = useParams();
  useEffect(() => {
    setActiveFilter('search');
  }, []);
  return (
    <div className="comp-Search bg-black text-white pt-12">
      <h1 className="text-2xl pt-9 pb-12 mx-4">
        Here are the palettes we found for your search:
      </h1>
      {<CardFeed searchParam={hex} />}
    </div>
  );
};

export default Search;
