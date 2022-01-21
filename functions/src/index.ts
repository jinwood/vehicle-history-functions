import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/v1/auth";

admin.initializeApp();

const db = admin.firestore();

// creates a document with ID -> uid in the users collection
export const createProfile = (userRecord: UserRecord, context: any) => {
  const { email, phoneNumber, uid } = userRecord;

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
};
