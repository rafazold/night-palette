import React from 'react';
import Palette from '../shared/Palette.jsx';
import Star from '../../images/icons/star.svg';

const Card = ({ palette, id, expanded, shrink, className, ...props }) => {
  return (
    <div
      className={[
        'mx-4 px-4 pt-3 bg-card-gray shadow-main rounded-md mb-20 cursor-pointer',
        expanded ? 'w-full' : shrink ? 'w-14' : 'w-60',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Palette colors={palette} className="h-56"/>
      <div className="flex justify-between h-16 items-center">
        <div className="text-base flex items-center">
          <Star className="w-3 h-3 mr-3" />
          <span>147</span>
        </div>
        <div className="text-sm text-gray-600">Today</div>
      </div>
    </div>
  );
};

export default Card;
