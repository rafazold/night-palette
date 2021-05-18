import React from 'react';

const Palette = ({
  colors,
  colorOnClick = () => undefined,
  activeColor,
  className,
  ...props
}) => {
  return (
    <div
      className={[
        'comp-palette',
        'rounded-md',
        'overflow-hidden',
        'flex',
        'flex-col',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {colors &&
        colors.map(({ color, hex }, i) => (
          <div
            key={hex + i}
            style={{ backgroundColor: hex }}
            onClick={() => colorOnClick(i)}
            className={[
              'w-full',
              i === 0 && 'h-1/3 rounded-t-md',
              i === 1 && 'h-1/4',
              i === 2 && 'h-1/5',
              i === 3 && 'flex-grow',
              i === 4 && 'h-1/10',
              i === colors.length - 1 && 'rounded-b-md',
              activeColor === i && 'border border-blue-600',
              'hover:border border-button-blue',
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
