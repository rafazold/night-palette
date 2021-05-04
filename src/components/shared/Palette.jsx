import React from 'react';

const Palette = (
  { colors, colorOnClick = () => undefined, activeColor, className },
  ...props
) => {
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
        colors.map(({ color, hex, id }, i) => (
          <div
            key={id + i}
            style={{ backgroundColor: color }}
            onClick={() => colorOnClick(i)}
            className={[
              'w-full',
              i === 0 && 'h-1/3',
              i === 1 && 'h-1/4',
              i === 2 && 'h-1/5',
              i === 3 && 'flex-grow',
              i === 4 && 'h-1/10',
              activeColor === i && 'border border-blue-600',
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
