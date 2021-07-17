import { useEffect, useState } from 'react';
import { firebase } from '../api/firebase.js';

export default () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('new');
  const [needRefresh, setNeedRefresh] = useState(false);
  const nearestColors = {
    red: '#ff003b',
    green: '#0aff00',
    blue: '#0089ff',
    purple: '#ce00ff',
    grey: '#c7c7c7',
    orange: '#ff7600',
    yellow: '#fff500',
    turquoise: '#00ffb1',
    brown: '#8e551c',
    pink: '#ff76d5',
    black: '#000000',
    white: '#ffffff',
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => unregisterAuthObserver();
  }, [user]);

  return {
    activeFilter,
    selectedCard,
    user,
    setActiveFilter,
    setSelectedCard,
    setUser,
    nearestColors,
    needRefresh,
    setNeedRefresh,
  };
};
