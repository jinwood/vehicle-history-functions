import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { UserRecord } from "firebase-functions/v1/auth";
// const functions = require("firebase-functions");

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

exports.createVehicle = functions.firestore
  .document("vehicles/{vehicleId}")
  .onCreate(
    async (
      snap: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext
    ) => {
      const data = snap.data();
      const vehicleId = context.params.vehicleId;
      const uid = context.auth?.uid;
      const vehicle = {
        ...data,
        uid,
        vehicleId,
        dateCreated: admin.firestore.Timestamp.now(),
      };
      return db
        .collection("vehicles")
        .doc(vehicleId)
        .set(vehicle)
        .catch((err: Error) => {
          console.error(err);
        });
    }
  );
