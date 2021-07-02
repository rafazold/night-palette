import React, { useRef, useState } from 'react';
import nearestColors from '../../assets/nearestColorsGuide.json';
import ColorPicker from '../create/createCard/ColorPicker';
import useOnClickAway from '../../hooks/clickAway';
import { useHistory } from 'react-router-dom';

const ColorsBar = ({ handleShow, className, ...props }) => {
  const [searchHex, setSearchHex] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const handleChangeColor = (e) => {
    setSelectedColor(e);
  };
  const history = useHistory();
  const pickerRef = useRef();
  useOnClickAway(pickerRef, (e) => {
    !e.target.getAttribute('data-searchable') && setSearchHex(false);
  });
  const barRef = useRef();
  useOnClickAway(barRef, () => handleShow(false));
  const handleSearch = () => {
    handleShow(false);
    selectedColor && history.push(`/s/${selectedColor.replaceAll('#', '')}`);
  };

  return (
    <div
      ref={barRef}
      className={[
        'comp-colors-bar',
        'flex',
        'justify-between',
        'container mx-auto px-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="flex flex-wrap">
        {Object.keys(nearestColors).map((key) => (
          <button
            onClick={() => {
              handleChangeColor(nearestColors[key]);
              setSearchHex(true);
            }}
            key={key}
            className="flex items-center mb-8"
          >
            <div
              style={{ backgroundColor: nearestColors[key] }}
              className="w-4 h-4 mx-2 rounded-sm border border-light-gray border-opacity-40"
            />
            <div className="text-white">{key}</div>
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          data-searchable="true"
          onClick={() => {
            setSearchHex(!searchHex);
          }}
          className="py-1 px-2 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black text-xs focus:outline-none lg:text-sm"
        >
          hex
        </button>
        {searchHex && (
          <div
            ref={pickerRef}
            className="absolute top-10 right-8 bg-card-gray rounded-xl px-4 pt-4 backdrop-filter backdrop-blur-lg bg-opacity-50"
          >
            <ColorPicker
              hex={selectedColor || ''}
              colorOnChange={handleChangeColor}
            />
            <div className="flex justify-center">
              <button
                disabled={!selectedColor}
                onClick={handleSearch}
                className={[
                  'px-2',
                  'my-2',
                  'rounded-lg',
                  'bg-gradient-to-r',
                  selectedColor
                    ? 'from-button-green to-button-blue'
                    : 'from-card-gray to-light-gray',
                  'text-black',
                  'text-xs',
                  'focus:outline-none',
                  'lg:text-sm',
                  'disabled:opacity-50',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorsBar;
