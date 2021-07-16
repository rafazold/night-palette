import React, { useState, useEffect, useContext } from 'react';
import { groupArray } from '../../utils.js';
import CardList from './CardList.jsx';
import context from '../../context/context.js';
import {
  getPalettesByCreationTime,
  getPalettesByLikes,
  getPalettesByUser,
  getPalettesBySearch,
  getLikedPalettes,
} from '../../api/api';
import { sortPalettesByKey } from '../../helpers/helpers';

const CardFeed = ({
  searchParam,
  sort = { sortBy: 'likesCount', direction: 'desc' },
  className,
  ...props
}) => {
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
      case 'created':
        getPalettesByUser(user.uid).then((cards) => {
          setPalettes(
            cards.sort(sortPalettesByKey(sort.sortBy, sort.direction))
          );
        });
        break;
      case 'liked':
        getLikedPalettes(user.uid).then((cards) => {
          setPalettes(
            cards.sort(sortPalettesByKey(sort.sortBy, sort.direction))
          );
        });
        break;
      case 'search':
        getPalettesBySearch(searchParam).then((cards) => {
          setPalettes(
            cards.sort(sortPalettesByKey(sort.sortBy, sort.direction))
          );
        });
        break;
      default:
        unsubscribe = getPalettesByCreationTime(setPalettes);
        return () => unsubscribe();
    }
  }, [activeFilter, searchParam]);

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
