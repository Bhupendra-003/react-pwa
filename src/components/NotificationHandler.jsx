import { useEffect } from 'react';
import { messaging } from '../../firebase';
import { getToken, onMessage } from 'firebase/messaging';

const NotificationHandler = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          
          // TODO: Replace with your VAPID key from Firebase Console -> Project Settings -> Cloud Messaging -> Web Configuration
          const vapidKey = "BIug-NB4OgfKzua-k3ygBIH2XJ1CsbCNb9B43rXXqclKtQy6fW4Stvq_gYg7eQ28cAwsLuh7EecfxosuUKgIHHc"; 
          
          if (vapidKey === "YOUR_VAPID_KEY_HERE") {
              console.warn("VAPID key is missing. Please add your VAPID key in src/components/NotificationHandler.jsx");
              return;
          }

          // Register the service worker explicitly
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registered:', registration);

          const token = await getToken(messaging, { 
            vapidKey, 
            serviceWorkerRegistration: registration 
          });
          console.log('FCM Token:', token);
          // Send this token to your server
        } else {
          console.log('Unable to get permission to notify.');
        }
      } catch (error) {
        console.error('Error getting permission or token:', error);
      }
    };

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Customize notification handling here
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/pwa-192x192.png'
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default NotificationHandler;
