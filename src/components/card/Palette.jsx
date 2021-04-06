import React from 'react';

const Palette = ({ colors, className }, ...props) => {
  return (
    <div
      className={['h-56', 'rounded-md', 'overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {colors.map(({ color, hex, id }, i) => (
        <div
          key={id + i}
          style={{ backgroundColor: color }}
          className={[
            'w-full',
            i === 0 && 'h-1/3',
            i === 1 && 'h-1/4',
            i === 2 && 'h-1/5',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {hex}
        </div>
      ))}
    </div>
  );
};

export default Palette;
