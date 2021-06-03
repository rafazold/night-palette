import React from 'react';
import Copy from '../../assets/images/icons/copy-icon.svg';
import { toast } from 'react-toastify';

const Palette = ({
  colors,
  colorOnClick = () => undefined,
  activeColor,
  className,
  cardId,
  tooltip,
  expanded,
  ...props
}) => {
  const hexClick = (e, hex) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hex).then((r) =>
      toast.dark(`${hex} copied to clipboard`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    );
  };

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
            data-tip=""
            data-for={cardId + hex + i}
            style={{ backgroundColor: hex }}
            onClick={() => colorOnClick(i)}
            className={[
              'w-full',
              'flex justify-center',
              i === 0 && 'h-1/3 rounded-t-md',
              i === 1 && 'h-1/4',
              i === 2 && 'h-1/5',
              i === 3 && 'flex-grow',
              i === 4 && 'h-1/10',
              i === colors.length - 1 && 'rounded-b-md',
              activeColor === i && 'border border-blue-600',
              'hover:border border-button-blue',
              'group relative',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div
              onClick={(e) => hexClick(e, hex)}
              className={[
                'my-auto',
                expanded ? 'flex' : 'hidden lg:group-hover:flex',
                'right-2',
                'items-center',
                'justify-between',
                'bg-black',
                'text-white',
                'bg-opacity-60 hover:bg-opacity-80',
                'backdrop-filter',
                'leading-5',
                'py-0.5',
                'px-1.5',
                'w-28',
                'rounded-lg',
                'absolute',
                'bottom-1',
                'gap-4',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span>{hex}</span>
              <Copy className="w-3 h-3" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Palette;
