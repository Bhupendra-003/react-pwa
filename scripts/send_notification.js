const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json'); // You need to download this

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// The FCM token of the device you want to send to
// Get this from the browser console
const registrationToken = 'YOUR_FCM_TOKEN_HERE';

const message = {
    notification: {
        title: 'Hello from Deployed App!',
        body: 'This is a programmatic notification.'
    },
    token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
