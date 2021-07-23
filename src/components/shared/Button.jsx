import React from 'react';

const Button = ({
  children,
  active,
  secondary = false,
  className,
  ...props
}) => (
  <button
    {...props}
    className={[
      'py-2',
      'lg:py-1',
      'px-2',
      'my-auto',
      'rounded-lg',
      'bg-gradient-to-r',
      secondary ? 'bg-button-gray' : 'from-button-green',
      'to-button-blue',
      'text-black',
      'text-xs',
      'focus:outline-none',
      'lg:text-sm',
      active && 'shadow-turquoise',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </button>
);

export default Button;
