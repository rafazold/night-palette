import React, { useState, useEffect, useContext } from 'react';
import { groupArray } from '../../../utils.js';
import CardList from './CardList.jsx';
import context from '../../../context/context.js';

const CardFeed = ({ className, ...props }) => {
  const [rows, setRows] = useState([]);
  const { palettes } = useContext(context);

  useEffect(() => {
    setRows(groupArray(palettes, 5));
  }, [palettes]);

  return (
    <div
      className={['flex flex-wrap mx-auto justify-center', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {rows && <CardList list={rows} type="D" />}
    </div>
  );
};

export default CardFeed;
