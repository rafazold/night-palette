import app from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import firebase from 'firebase';

const db = app.firestore();
const palettes = db.collection('palettes');

export const getAllPalettes = async () => {
  const pal = palettes.get().then((snap) => {
    return snap.docs.map((doc) => doc.data());
  });
  return await pal;
};

export const getPalettesByCreationTime = (callBack) => {
  getPalettesByLikes();
  const unsubscribe = palettes
    .orderBy('createdAt', 'desc')
    .onSnapshot((snap) => {
      let pal = [];
      snap.docs.map((doc) => {
        pal.push(doc.data());
      });
      callBack(pal);
    });
  if (!callBack) {
    unsubscribe();
  }
};

export const getPalettesByLikes = (callBack) => {
  const unsubscribe = palettes.orderBy('likes', 'desc').onSnapshot((snap) => {
    let pal = [];
    snap.docs.map((doc) => {
      pal.push(doc.data());
    });
    callBack(pal);
  });
  if (!callBack) {
    unsubscribe();
  }
};

export const setPalette = async ({ userId, id, colors, type }) => {
  const creationTime = firebase.firestore.FieldValue.serverTimestamp();
  return await palettes
    .doc(id)
    .set({
      userId,
      id,
      colors,
      type,
      likes: {},
      createdAt: creationTime,
    })
    .catch((err) => console.log(err));
};

export const checkAvailable = async (id) => {
  return await palettes
    .where('id', '==', id)
    .get()
    .then((snap) => {
      console.log(snap.metadata);
      return snap.empty;
    });
};

export const addLIke = async (paletteId, userId) => {
  return await palettes.doc(paletteId).update({
    likes: { [userId]: true },
  });
};
export const removeLike = async (paletteId, userId) => {
  return await palettes.doc(paletteId).set(
    {
      likes: { [userId]: firebase.firestore.FieldValue.delete() },
    },
    { merge: true }
  );
};
