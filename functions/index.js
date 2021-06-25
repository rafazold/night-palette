const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.likesCountChange = functions.firestore
  .document('/palettes/{paletteId}')
  .onWrite((event, context) => {
    const paletteRef = db.collection('palettes').doc(context.params.paletteId);
    return db.runTransaction((t) => {
      return t.get(paletteRef).then((paletteDoc) => {
        const likes = Object.keys(paletteDoc.get('likes'));
        const updateData = { likesCount: likes.length };
        if (paletteDoc.exists) {
          t.update(paletteRef, updateData);
        } else {
          t.set(paletteRef, updateData);
        }
      });
    });
  });

exports.setNearestColors = functions.firestore
  .document('/palettes/{paletteId}')
  .onCreate((event, context) => {
    const colors = {
      red: 'ff003b',
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
    const nearestColor = require('nearest-color').from(colors);
    const paletteRef = db.collection('palettes').doc(context.params.paletteId);
    return db.runTransaction((t) => {
      return t.get(paletteRef).then((paletteDoc) => {
        let nearest = {};
        const colors = paletteDoc.get('colors');
        colors.forEach((color) => {
          nearest[nearestColor(color.hex).value] = true;
        });
        const updateData = { nearestColors: nearest };
        if (paletteDoc.exists) {
          t.update(paletteRef, updateData);
        } else {
          t.set(paletteRef, updateData);
        }
      });
    });
  });
