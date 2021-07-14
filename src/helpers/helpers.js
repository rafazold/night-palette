export const sortPalettesByKey = (key, direction) => (a, b) => {
  if (direction === 'desc') {
    return a[key] === b[key] ? 0 : a[key] < b[key] ? 1 : -1;
  }
  return a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : 1;
};
