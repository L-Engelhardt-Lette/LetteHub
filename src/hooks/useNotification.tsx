import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import Notification from "../components/notification/Notification"; // Import the Notification component
import React from "react";

// Define the NotificationType
type NotificationType = {
  id: number;
  text: string;
  variant?: "success" | "error" | "warning" | "info";
};

// Create a context for notification management
const NotificationContext = createContext<{
  addNotification: (
    text: string,
    variant?: NotificationType["variant"]
  ) => void;
}>({
  addNotification: () => {},
});

// Provider component that holds notifications state
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Function to add a new notification
  const addNotification = (
    text: string,
    variant: NotificationType["variant"] = "info"
  ) => {
    const newNotification = {
      id: Math.random(),
      text,
      variant,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  // Function to remove a notification
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        <AnimatePresence>
          {notifications.map((notif) => (
            <Notification
              key={notif.id}
              id={notif.id}
              text={notif.text}
              variant={notif.variant}
              removeNotif={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};
