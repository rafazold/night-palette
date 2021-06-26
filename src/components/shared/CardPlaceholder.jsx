import React from 'react';
import Palette from './Palette.jsx';
import Star from '../../assets/images/icons/star.svg';

const CardPlaceholder = ({ palette, id, likes, className, ...props }) => (
  <div
    className={[
      'mx-4 px-4 pt-3 bg-light-gray opacity-5 shadow-main rounded-md mb-20 cursor-pointer hide-tap',
      'w-full lg:w-64',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <Palette
      colors={[
        { color: '#e3e3e3', hex: '#e3e3e3' },
        { color: '#bfbfbf', hex: '#bfbfbf' },
        { color: '#919191', hex: '#919191' },
        { color: '#6f6f6f', hex: '#6f6f6f' },
        { color: '#262626', hex: '#262626' },
      ]}
      cardId="placeholder"
      className="h-72"
      colorOnClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      avoidHover
    />
    <div
      className={['flex', 'justify-between', 'h-16', 'items-center']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="text-base flex items-center px-1.5 py-0.5 bg-black rounded-md">
        <Star
          className={['w-3', 'h-3', 'mr-3', 'text-button-blue']
            .filter(Boolean)
            .join(' ')}
        />
        <span className="text-black">000</span>
      </div>
    </div>
  </div>
);

export default CardPlaceholder;
