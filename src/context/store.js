import { useEffect, useState } from 'react';
import usePersistState from '../hooks/usePersistState.js';
import defaultPalettes from '../assets/default-palettes.json';
import { firebase } from '../api/firebase.js';
import { getPalettesByCreationTime, getPalettesByLikes } from '../api/api';

export default () => {
  const [customPalettes, setCustomPalettes] = usePersistState(
    'customPalettes',
    []
  );
  const [selectedCard, setSelectedCard] = useState('');
  const [user, setUser] = useState(null);
  const [palettes, setPalettes] = useState(null);
  const [activeFilter, setActiveFilter] = useState('new');
  const getPalettes = (filter) => {
    if (filter === 'new') {
      getPalettesByCreationTime(setPalettes);
    } else {
      getPalettesByLikes(setPalettes);
    }
  };
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => unregisterAuthObserver();
  }, []);
  useEffect(() => {
    getPalettes(activeFilter);
  }, [activeFilter]);

  const addCustomPalette = ({ paletteId, colors }) => {
    if (customPalettes.some((item) => item.id === paletteId)) {
      alert('id exists');
    } else {
      customPalettes[paletteId] = colors;
      setCustomPalettes([...customPalettes, { id: paletteId, colors }]);
    }
  };
  return {
    activeFilter,
    customPalettes,
    defaultPalettes,
    palettes,
    selectedCard,
    user,
    setActiveFilter,
    setCustomPalettes,
    setSelectedCard,
    setUser,
    addCustomPalette,
  };
};
