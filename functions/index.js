// prettier-ignore
const functions = require("firebase-functions");
// prettier-ignore
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

// prettier-ignore
exports.likesCountChange = functions.firestore
  .document("/palettes/{paletteId}")
  .onWrite((event, context) => {
// prettier-ignore
    const paletteRef = db
      .collection("palettes")
      .doc(context.params.paletteId);
// prettier-ignore
    return db.runTransaction(t => {
      return t.get(paletteRef).then(paletteDoc => {
        const likes = Object.keys(paletteDoc.get("likes"));
        const updateData = {likesCount: likes.length};
          if (paletteDoc.exists) {
            t.update(paletteRef, updateData);
          }
          else {
            t.set(paletteRef, updateData);
          }
        });
      });
    });
