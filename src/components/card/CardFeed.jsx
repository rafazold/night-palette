import React, { useState, useEffect, useContext } from 'react';
import { groupArray } from '../../utils.js';
import CardList from './CardList.jsx';
import context from '../../context/context.js';

const CardFeed = ({ className, ...props }) => {
  const [rows, setRows] = useState([]);
  const [ownedRows, setOwnedRows] = useState([]);
  const { defaultPalettes, customPalettes } = useContext(context);
  useEffect(() => {
    console.log();
    setOwnedRows(groupArray(Object.values(customPalettes), 5));
    setRows(groupArray(defaultPalettes, 5));
  }, [defaultPalettes]);

  return (
    <div
      className={['flex flex-wrap mx-auto justify-center', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {ownedRows && <CardList list={ownedRows} />}
      {rows && <CardList list={rows} />}
    </div>
  );
};

export default CardFeed;
