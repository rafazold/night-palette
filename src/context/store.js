import { useEffect, useState } from 'react';
import usePersistState from '../hooks/usePersistState.js';
import defaultPalettes from '../assets/default-palettes.json';
import { firebase } from '../api/firebase.js';

export default () => {
  const [customPalettes, setCustomPalettes] = usePersistState(
    'customPalettes',
    []
  );
  const [selectedCard, setSelectedCard] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => unregisterAuthObserver();
  }, []);

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
    user,
    setUser,
    addCustomPalette,
  };
};
