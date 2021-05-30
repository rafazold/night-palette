import React, { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

const ColorPicker = ({
  hex,
  edit = true,
  pickerClassName,
  colorOnChange,
  className,
  ...props
}) => {
  const [color, setColor] = useState(hex);

  return (
    <div
      className={['comp-color-picker absolute w-min', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {edit && (
        <>
          <HexColorPicker
            className={pickerClassName}
            color={color}
            onChange={(e) => {
              setColor(e);
              colorOnChange(e);
            }}
          />
          <div className="flex justify-center items-center mt-2">
            <span className="text-white mr-4 text-lg">Hex:</span>
            <HexColorInput
              className="text-black w-1/2 rounded-sm"
              color={color}
              onChange={colorOnChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
