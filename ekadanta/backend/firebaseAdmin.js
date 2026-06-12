const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {

  console.log(
    "Using Firebase from ENV"
  );

  serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );

} else {

  console.log(
    "Using local serviceAccountKey.json"
  );

  serviceAccount = require(
    "./serviceAccountKey.json"
  );

}

admin.initializeApp({
  credential:
    admin.credential.cert(
      serviceAccount
    )
});

const db =
  admin.firestore();

module.exports = {
  admin,
  db
};