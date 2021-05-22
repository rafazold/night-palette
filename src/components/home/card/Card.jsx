import React from 'react';
import Palette from '../../shared/Palette.jsx';
import Star from '../../../assets/images/icons/star.svg';

const Card = ({ palette, id, expanded, shrink, className, ...props }) => {
  const handleLike = (e) => {
    e.stopPropagation();
    console.log('liked');
  };
  return (
    <div
      className={[
        'mx-4 px-4 pt-3 bg-card-gray shadow-main rounded-md mb-20 cursor-pointer',
        expanded ? 'lg:w-2/3' : shrink ? 'lg:w-1/5' : 'lg:w-60',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Palette colors={palette} cardId={id} tooltip className="h-72 lg:h-56" />
      <div
        className={[
          'flex',
          'justify-between',
          'h-16',
          'items-center',
          shrink && 'lg:hidden',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="text-base flex items-center px-1.5 py-0.5 bg-black">
          <Star className="w-3 h-3 mr-3" />
          <span onClick={handleLike}>147</span>
        </div>
        <div className="text-sm text-gray-600">Today</div>
      </div>
    </div>
  );
};

export default Card;
