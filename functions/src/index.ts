import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/v1/auth";
const functions = require("firebase-functions");

admin.initializeApp();

const db = admin.firestore();

// creates a document with ID -> uid in the users collection
exports.createUser = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    const { email, phoneNumber, uid } = user;

    return db
      .collection("users")
      .doc(uid)
      .set({
        email,
        phoneNumber,
        uid,
      })
      .catch((err) => {
        console.error(err);
      });
  });
