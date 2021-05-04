export const getOwnedPalettes = () =>
  window.localStorage.getItem('ownedPalettes');
export const setOwnedPalettes = (palettes) =>
  window.localStorage.setItem('ownedPalettes', JSON.stringify(palettes));
export const makeObjectFromArr = (arr) => {
  const key = arr.map((obj) => obj.hex).join('');
  return { [key]: arr };
};
export const makePaletteId = (colors) => colors.map((obj) => obj.hex).join('');
export const groupArray = (arr, innerArrLength) => {
  let finalArr = [];
  let stack = [];
  arr.forEach((item, i) => {
    if ((i + 1) % innerArrLength === 0 || i + 1 === arr.length) {
      stack.push({ id: `R${finalArr.length}I${i + 1}`, items: item });
      finalArr.push(stack);
      stack = [];
    } else {
      stack.push({ id: `R${finalArr.length}I${i + 1}`, items: item });
    }
  });
  return finalArr;
};
