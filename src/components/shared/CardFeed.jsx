import React, { useState, useEffect, useContext } from 'react';
import { groupArray } from '../../utils.js';
import CardList from './CardList.jsx';
import context from '../../context/context.js';
import {
  getPalettesByCreationTime,
  getPalettesByLikes,
  getPalettesByUser,
} from '../../api/api';

const CardFeed = ({ className, ...props }) => {
  const [rows, setRows] = useState([]);
  const [palettes, setPalettes] = useState(null);
  const { activeFilter, user } = useContext(context);

  useEffect(() => {
    let unsubscribe;

    switch (activeFilter) {
      case 'new':
        unsubscribe = getPalettesByCreationTime(setPalettes);
        return () => unsubscribe();
      case 'popular':
        unsubscribe = getPalettesByLikes(setPalettes);
        return () => unsubscribe();
      case 'personal':
        unsubscribe = getPalettesByUser(setPalettes, user.uid);
        return () => unsubscribe();
    }
  }, [activeFilter]);

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
