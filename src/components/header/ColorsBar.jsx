import React, { useRef, useState } from 'react';
import nearestColors from '../../assets/nearestColorsGuide.json';
import ColorPicker from '../create/createCard/ColorPicker';
import useOnClickAway from '../../hooks/clickAway';
import { useHistory } from 'react-router-dom';

const ColorsBar = ({ handleShow, show, className, ...props }) => {
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
  useOnClickAway(barRef, (e) => {
    !e.target.getAttribute('data-button') && handleShow(false);
  });
  const handleSearch = () => {
    handleShow(false);
    selectedColor && history.push(`/s/${selectedColor.replaceAll('#', '')}`);
  };

  return (
    <div
      ref={barRef}
      className={[
        'comp-colors-bar',
        'max-h-96',
        searchHex && show && 'h-80 lg:h-96',
        'flex',
        'lg:justify-between',
        'container mx-auto px-4',
        'flex-col lg:flex-row',
        'items-start flex-wrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="flex flex-wrap relative lg:h-10">
        {Object.keys(nearestColors).map((key) => (
          <button
            onClick={() => {
              history.push(`/s/${nearestColors[key].replaceAll('#', '')}`);
            }}
            key={key}
            className="flex items-center mb-4 lg:mb-8 w-1/4 lg:w-auto"
          >
            <div
              style={{ backgroundColor: nearestColors[key] }}
              className="w-4 h-4 mx-2 rounded-sm border border-light-gray border-opacity-40 flex-shrink-0"
            />
            <div className="text-white">{key}</div>
          </button>
        ))}
      </div>
      <div className="lg:relative flex justify-center">
        <button
          data-searchable="true"
          onClick={() => {
            setSearchHex(!searchHex);
          }}
          className="py-1 text-xl px-8 my-auto rounded-lg bg-gradient-to-r from-button-green to-button-blue text-black focus:outline-none lg:text-sm"
        >
          hex
        </button>
        {searchHex && (
          <div
            ref={pickerRef}
            className="absolute top-0 lg:top-10 right-8 bg-card-gray rounded-xl px-4 pt-4 backdrop-filter backdrop-blur-lg bg-opacity-50"
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
                  'py-2 px-4',
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
