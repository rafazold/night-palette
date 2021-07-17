import React, { useRef } from 'react';
import useOnClickAway from '../../hooks/clickAway';

const Popup = ({
  open,
  children,
  className,
  buttonClassName,
  buttonIcon,
  handleOpen,
  ...props
}) => {
  const popRef = useRef();
  useOnClickAway(popRef, (e) => {
    !e.target.getAttribute('data-button') &&
      e.target.getAttribute('class') !== 'user-Icon_svg__cls-2' &&
      handleOpen(false);
  });

  return (
    <div className="relative flex">
      <button
        className={buttonClassName}
        data-button="true"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleOpen(!open);
        }}
      >
        {buttonIcon}
      </button>
      {open && (
        <div
          ref={popRef}
          className={['absolute', className].filter(Boolean).join(' ')}
          {...props}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popup;
