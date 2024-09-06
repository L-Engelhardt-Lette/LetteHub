import { useState } from "react";

// Type definition for a notification object
export type NotificationType = {
  id: number;
  text: string;
};

// This custom hook will handle notification state management
export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  // Function to add a new notification
  const addNotification = (text: string) => {
    setNotification({ id: Math.random(), text }); // Generate a random ID for the notification
  };

  // Function to remove the notification
  const removeNotification = () => {
    setNotification(null);
  };

  // Return both functions and current notification state
  return { notification, addNotification, removeNotification };
};
