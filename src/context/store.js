import { useState } from 'react';
import usePersistState from '../hooks/usePersistState.js';
import defaultPalettes from '../assets/default-palettes.json';

export default () => {
  const [customPalettes, setCustomPalettes] = usePersistState(
    'customPalettes',
    []
  );
  const [selectedCard, setSelectedCard] = useState('');
  const addCustomPalette = ({ paletteId, colors }) => {
    if (customPalettes.some((item) => item.id === paletteId)) {
      alert('id exists');
    } else {
      customPalettes[paletteId] = colors;
      setCustomPalettes([...customPalettes, { id: paletteId, colors }]);
    }
  };
  return {
    customPalettes,
    setCustomPalettes,
    defaultPalettes,
    selectedCard,
    setSelectedCard,
    addCustomPalette,
  };
};
