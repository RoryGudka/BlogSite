const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {db, admin};