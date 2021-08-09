import React, { useState, useEffect, useContext } from 'react';
import { groupArray } from '../../helpers/helpers.js';
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
import CardPlaceholder from './CardPlaceholder';

const CardFeed = ({
  searchParam,
  sort = { sortBy: 'likesCount', direction: 'desc' },
  className,
  ...props
}) => {
  const [rows, setRows] = useState([]);
  const [palettes, setPalettes] = useState(null);
  const { activeFilter, user, needRefresh, setNeedRefresh } = useContext(
    context
  );

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
    setNeedRefresh(false);
  }, [activeFilter, searchParam, needRefresh]);

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
      {rows.length ? (
        <CardList list={rows} type="D" />
      ) : (
        <div className="flex justify-between w-full">
          <CardPlaceholder />
          <CardPlaceholder className="hidden lg:block" />
          <CardPlaceholder className="hidden lg:block" />
          <CardPlaceholder className="hidden lg:block" />
          <CardPlaceholder className="hidden lg:block" />
        </div>
      )}
    </div>
  );
};

export default CardFeed;
