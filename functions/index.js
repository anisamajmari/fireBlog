/* eslint-disable no-undef */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  try {
    const auth = admin.auth();
    const user = await auth.getUserByEmail(data.email);
    await auth.setCustomUserClaims(user.uid, {
      admin: true
    });
    return {
      message: `Success! ${data.email} has been made an admin.`
    };
  } catch (e) {
    console.log(e);
  }
});
