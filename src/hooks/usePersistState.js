import React from 'react';

const usePersistState = (key, defValue) => {
  const [value, setValue] = React.useState(() => {
    const storedValue = window.localStorage.getItem(key);

    return storedValue !== null ? JSON.parse(storedValue) : defValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default usePersistState;
