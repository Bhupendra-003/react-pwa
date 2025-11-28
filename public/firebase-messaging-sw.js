importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAlae9m_PKPks8KLcfQlaQZgEoCjMnh49E",
    authDomain: "concat-7fcf9.firebaseapp.com",
    projectId: "concat-7fcf9",
    storageBucket: "concat-7fcf9.firebasestorage.app",
    messagingSenderId: "13505970033",
    appId: "1:13505970033:web:933e7c670ad3e4d2a240d0",
    measurementId: "G-DQDC9H2NFS"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/pwa-192x192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
