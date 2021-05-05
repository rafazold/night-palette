export const makeObjectFromArr = (arr) => {
  const key = arr.map((obj) => obj.hex).join('');
  return { [key]: arr };
};

export const makePaletteId = (colors) => colors.map((obj) => obj.hex).join('');

export const groupArray = (arr, innerArrLength) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  let finalArr = [];
  let stack = [];
  arr.forEach((item, i) => {
    if ((i + 1) % innerArrLength === 0 || i + 1 === arr.length) {
      stack.push(item);
      finalArr.push(stack);
      stack = [];
    } else {
      stack.push(item);
    }
  });
  return finalArr;
};
