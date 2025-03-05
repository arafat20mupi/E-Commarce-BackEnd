const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecomarce-8fe12.firebaseio.com", // Replace with your Firebase database URL
});


module.exports = admin;