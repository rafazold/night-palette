import app from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import nearestColors from '../assets/nearestColorsGuide.json';
const nearestColor = require('nearest-color').from(nearestColors);

const db = app.firestore();
const palettes =
  process.env.NODE_ENV === 'production'
    ? db.collection('palettes')
    : db.collection('dev-palettes');
const roles = db.collection('roles');

export const getPalettesByCreationTime = (callBack) => {
  return palettes.orderBy('createdAt', 'desc').onSnapshot((snap) => {
    let pal = [];
    snap.docs.map((doc) => {
      pal.push(doc.data());
    });
    callBack(pal);
  });
};

export const getPalettesByLikes = (callBack) => {
  return palettes.orderBy('likesCount', 'desc').onSnapshot((snap) => {
    let pal = [];
    snap.docs.map((doc) => {
      pal.push(doc.data());
    });
    callBack(pal);
  });
};

export const getPalettesByUser = async (userId) => {
  return await palettes
    .where('userId', '==', userId)
    .get()
    .then((snap) => {
      let docs = [];
      snap.docs.map((doc) => {
        docs.push(doc.data());
      });
      return docs;
    });
};
export const getLikedPalettes = async (userId) => {
  return await palettes
    .where(`likes.${userId}`, '==', true)
    .get()
    .then((snap) => {
      let docs = [];
      snap.docs.map((doc) => {
        docs.push(doc.data());
      });
      return docs;
    })
    .catch((err) => console.log(err));
};

export const getPaletteById = async (id) => {
  return await palettes
    .where('id', '==', id)
    .get()
    .then((snap) => {
      let docs = [];
      snap.forEach((doc) => {
        docs.push(doc.data());
      });
      return docs;
    })
    .catch((err) => console.log(err));
};

export const getPalettesBySearch = async (hex) => {
  return await palettes
    .where(`nearestColors.${nearestColor(hex).value}`, '==', true)
    .get()
    .then((snap) => {
      let docs = [];
      snap.forEach((doc) => {
        docs.push(doc.data());
      });
      return docs;
    })
    .catch((err) => console.log(err));
};

export const setPalette = async ({ userId, id, colors, type }) => {
  const creationTime = app.firestore.FieldValue.serverTimestamp();
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

export const deletePalette = async (id) => {
  return await palettes
    .doc(id)
    .delete()
    .catch((err) => console.log(err));
};

export const checkAvailable = async (id) => {
  return await palettes
    .where('id', '==', id)
    .get()
    .then((snap) => snap.empty);
};

export const checkHasOwnPalettes = async (id) => {
  return await palettes
    .where('userId', '==', id)
    .get()
    .then((snap) => {
      return !snap.empty;
    });
};

export const addLike = async (paletteId, userId) => {
  return await palettes.doc(paletteId).set(
    {
      likes: { [userId]: true },
    },
    {
      merge: true,
    }
  );
};

export const removeLike = async (paletteId, userId) => {
  return await palettes.doc(paletteId).set(
    {
      likes: { [userId]: app.firestore.FieldValue.delete() },
    },
    { merge: true }
  );
};

export const checkIsAdmin = async (id) => {
  return await roles
    .doc(id)
    .get()
    .then((snap) => snap.data());
};
