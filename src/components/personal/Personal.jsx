import React, { useContext, useEffect, useState } from 'react';
import CardFeed from '../shared/CardFeed.jsx';
import context from '../../context/context';
import { Link } from 'react-router-dom';
import CardPlaceholder from '../shared/CardPlaceholder';
import { checkHasOwnPalettes } from '../../api/api';

const Personal = () => {
  const { setActiveFilter, user } = useContext(context);
  const [hasPalettes, setHasPalettes] = useState(false);
  useEffect(() => {
    user &&
      checkHasOwnPalettes(user.uid).then((hasOwnPalettes) => {
        setHasPalettes(hasOwnPalettes);
      });
  }, [user]);

  useEffect(() => {
    hasPalettes && setActiveFilter('personal');
  }, [hasPalettes]);
  return (
    <div className="comp-personal bg-black text-white pt-12">
      {(!user || !hasPalettes) && (
        <>
          <div className="flex justify-between">
            <CardPlaceholder />
            <CardPlaceholder className="hidden lg:block" />
            <CardPlaceholder className="hidden lg:block" />
            <CardPlaceholder className="hidden lg:block" />
            <CardPlaceholder className="hidden lg:block" />
          </div>
          <div className="container m-auto text-light-gray">
            <h1 className="text-6xl pt-9 text-center">No Palettes Yet...</h1>
            <div className="w-full flex justify-center mt-6">
              <Link
                className="py-3 px-8 m-auto rounded-sm bg-gradient-to-r from-button-green to-button-blue text-black text-xs focus:outline-none"
                to="/create"
              >
                + Add Palette
              </Link>
            </div>
          </div>
        </>
      )}
      {user && hasPalettes && <CardFeed />}
    </div>
  );
};

export default Personal;
