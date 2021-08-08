import { useEffect, useState } from 'react';
import { firebase } from '../api/firebase.js';

export default () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('new');
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
    needRefresh,
    setNeedRefresh,
    isAdmin,
    setIsAdmin,
  };
};
