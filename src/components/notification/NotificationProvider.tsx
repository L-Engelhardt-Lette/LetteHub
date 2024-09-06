import { AnimatePresence } from "framer-motion";
import { Notification } from "./Notification";
import { useNotification, NotificationType } from "../hooks/useNotification";
import React from "react";

// The NotificationProvider handles displaying the notifications using framer-motion's AnimatePresence for animations
export const NotificationProvider: React.FC = () => {
  const { notification, removeNotification } = useNotification(); // Use the custom hook to get notification and removal functions

  return (
    <AnimatePresence>
      {notification && (
        <Notification
          key={notification.id}
          text={notification.text}
          id={notification.id}
          removeNotification={removeNotification}
        />
      )}
    </AnimatePresence>
  );
};
