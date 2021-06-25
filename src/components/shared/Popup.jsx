import React, { useRef } from 'react';
import useOnClickAway from '../../hooks/clickAway';

const Popup = ({
  open,
  children,
  className,
  buttonIcon,
  top,
  bottom,
  left,
  right,
  handleOpen,
  ...props
}) => {
  const popRef = useRef();
  useOnClickAway(popRef, () => handleOpen(false));

  return (
    <div className="relative">
      <button onClick={() => handleOpen(true)}>{buttonIcon}</button>
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