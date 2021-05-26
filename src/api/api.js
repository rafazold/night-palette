import app from 'firebase/app';
import 'firebase/database';

const db = app.database();
const palettes = db.ref('palettes');

export const getPalettes = () => {
  palettes.get().then((snap) => {
    console.log(snap);
  });
};

export const setPalette = ({ userId, id, colors }) => {
  debugger;
  palettes
    .push()
    .set({ userId, id, colors })
    .then((res) => console.log(res));
};
