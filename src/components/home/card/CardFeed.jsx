import React, { useState, useEffect, useContext } from 'react';
import { groupArray } from '../../../utils.js';
import CardList from './CardList.jsx';
import context from '../../../context/context.js';
import { firebase } from '../../../api/firebase';

const CardFeed = ({ className, ...props }) => {
  const [rows, setRows] = useState([]);
  const [customRows, setCustomRows] = useState([]);
  const { user, setUser, defaultPalettes, customPalettes } = useContext(
    context
  );

  useEffect(() => {
    setCustomRows(groupArray(customPalettes, 5));
    setRows(groupArray(defaultPalettes, 5));
  }, [defaultPalettes]);

  return (
    <div
      className={['flex flex-wrap mx-auto justify-center', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {customRows && <CardList list={customRows} type="C" />}
      {rows && <CardList list={rows} type="D" />}
    </div>
  );
};

export default CardFeed;
