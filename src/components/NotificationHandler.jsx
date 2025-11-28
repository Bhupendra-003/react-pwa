import { useState, useEffect } from 'react';
import { messaging } from '../../firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { Copy, X, AlertCircle, Check } from 'lucide-react';

const NotificationHandler = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          
          // TODO: Replace with your VAPID key from Firebase Console -> Project Settings -> Cloud Messaging -> Web Configuration
          const vapidKey = "BIug-NB4OgfKzua-k3ygBIH2XJ1CsbCNb9B43rXXqclKtQy6fW4Stvq_gYg7eQ28cAwsLuh7EecfxosuUKgIHHc"; 
          
          if (vapidKey === "YOUR_VAPID_KEY_HERE") {
              const err = "VAPID key is missing. Please add your VAPID key in src/components/NotificationHandler.jsx";
              console.warn(err);
              setError(err);
              return;
          }

          // Unregister existing service workers to ensure a clean slate
          if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
              await registration.unregister();
            }
          }

          // Register the service worker explicitly
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registered:', registration);

          const token = await getToken(messaging, { 
            vapidKey, 
            serviceWorkerRegistration: registration 
          });
          console.log('FCM Token:', token);
          setFcmToken(token);
          // Send this token to your server
        } else {
          console.log('Unable to get permission to notify.');
          setError('Notification permission denied');
        }
      } catch (error) {
        console.error('Error getting permission or token:', error);
        setError(error.message || 'Error getting token');
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

  const copyToClipboard = () => {
    if (fcmToken) {
      navigator.clipboard.writeText(fcmToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isVisible || (!fcmToken && !error)) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] animate-slide-up">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg flex-shrink-0 ${error ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {error ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          </div>
          <div className="flex-grow overflow-hidden">
            <h3 className="font-semibold text-gray-800 mb-1">
              {error ? 'Notification Error' : 'FCM Token Generated'}
            </h3>
            {error ? (
              <p className="text-red-500 text-sm break-words">{error}</p>
            ) : (
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 group relative">
                <p className="text-gray-600 text-xs font-mono break-all pr-8 line-clamp-2 hover:line-clamp-none transition-all">
                  {fcmToken}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            {!error && (
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-purple-600"
                title="Copy Token"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationHandler;
