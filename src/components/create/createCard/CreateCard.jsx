import React, { useState, useRef, useContext } from 'react';
import Palette from '../../shared/Palette.jsx';
import ColorPicker from './ColorPicker.jsx';
import useOnClickAway from '../../../hooks/clickAway.jsx';
import context from '../../../context/context.js';
import { makePaletteId } from '../../../utils.js';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkAvailable, setPalette } from '../../../api/api';

const CreateCard = ({ className, ...props }) => {
  const initialColors = [
    { color: '#e3e3e3', hex: '#e3e3e3' },
    { color: '#bfbfbf', hex: '#bfbfbf' },
    { color: '#919191', hex: '#919191' },
    { color: '#6f6f6f', hex: '#6f6f6f' },
    { color: '#262626', hex: '#262626' },
  ];
  const history = useHistory();
  const [colors, setColors] = useState(initialColors);
  const [currentColor, setCurrentColor] = useState({ color: '', index: '' });
  const [edit, setEdit] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const handleChangeColor = (e) => {
    setEdit(true);
    let newProfile = [...colors];
    newProfile[currentColor.index] = {
      color: e,
      hex: e,
    };
    setColors(newProfile);
  };
  const handleColorClick = (index) => {
    const current = {
      color: colors[index],
      index: index,
    };
    setCurrentColor(current);
    setEdit(true);
    buttonDisabled && setButtonDisabled(false);
  };
  const { user, addCustomPalette, customPalettes } = useContext(context);
  const addPalette = () => {
    const paletteId = makePaletteId(colors);
    checkAvailable(paletteId).then((available) => {
      if (!available) {
        toast.info(
          <Link to="/">palette already exists, click to search for it...</Link>,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      } else {
        // addCustomPalette({ paletteId, colors });
        setPalette({
          id: paletteId,
          colors: colors,
          userId: user.uid,
          type: 'custom',
        }).then(() => {
          history.push('/');
        });
      }
    });
    const ref = useRef();
    useOnClickAway(ref, () => setEdit(false));

    return (
      <div
        className={[
          'comp-create-card',
          'text-white h-40',
          'flex',
          'flex-col',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <div
          ref={ref}
          className="h-full w-full lg:w-3/5 mx-auto py-16 px-10 max-w-3xl relative"
        >
          <Palette
            className="h-full w-full cursor-pointer"
            colors={colors}
            colorOnClick={handleColorClick}
            activeColor={edit && currentColor.index}
          />

          {edit && (
            <ColorPicker
              hex={currentColor.color.hex}
              colorOnChange={handleChangeColor}
              className="absolute top-0 right-0"
            />
          )}
        </div>
        <button
          onClick={addPalette}
          className={[
            'disabled:bg-button-gray',
            'py-1',
            'px-8',
            'rounded-lg',
            'disabled:text-gray-600',
            'border',
            'disabled:border-button-gray',
            'bg-gradient-to-r',
            !buttonDisabled && 'from-button-green',
            'to-button-blue',
            'text-black',
            'mb-10',
            'w-min',
            'mx-auto',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </div>
    );
  };
};

export default CreateCard;
