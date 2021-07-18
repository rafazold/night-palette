import React, { useContext, useEffect, useState } from 'react';
import CardFeed from '../shared/CardFeed.jsx';
import context from '../../context/context';
import { Link } from 'react-router-dom';
import CardPlaceholder from '../shared/CardPlaceholder';
import { checkHasOwnPalettes } from '../../api/api';
import Star from '../../assets/images/icons/star.svg';
import Button from '../shared/Button';

const Personal = () => {
  const { setActiveFilter, activeFilter, user } = useContext(context);
  const [hasPalettes, setHasPalettes] = useState(false);
  useEffect(() => {
    user &&
      checkHasOwnPalettes(user.uid).then((hasOwnPalettes) => {
        setHasPalettes(hasOwnPalettes);
      });
  }, [user]);

  useEffect(() => {
    hasPalettes && setActiveFilter('created');
  }, [hasPalettes]);
  return (
    <div className="comp-personal bg-black text-white">
      <div className="flex my-8">
        <span className="text-3xl">My Palettes:</span>
        <Button
          onClick={() => {
            setActiveFilter('liked');
          }}
          secondary={activeFilter !== 'liked'}
          className="flex mx-4 items-center"
        >
          <Star className="w-3 h-3 mr-1" />
          <span>Liked</span>
        </Button>
        <Button
          onClick={() => {
            setActiveFilter('created');
          }}
          secondary={activeFilter !== 'created'}
        >
          Created
        </Button>
      </div>
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
      {user && hasPalettes && (
        <CardFeed sort={{ sortBy: 'likesCount', direction: 'desc' }} />
      )}
    </div>
  );
};

export default Personal;
