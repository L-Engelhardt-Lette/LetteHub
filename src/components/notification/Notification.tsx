import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";
import React from "react";

type NotificationProps = {
  text: string; // The notification message to display
  id: number; // The unique ID of the notification
  removeNotification: (id: number) => void; // Function to remove the notification
};

const NOTIFICATION_TTL = 5000; // The time (in ms) before the notification auto-closes

export const Notification: React.FC<NotificationProps> = ({
  text,
  id,
  removeNotification,
}) => {
  // Automatically remove the notification after 5 seconds
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotification(id); // Call the remove function
    }, NOTIFICATION_TTL);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timeoutRef);
  }, [id, removeNotification]);

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.9, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: -25, scale: 0.9, opacity: 0 }}
      transition={{ type: "spring" }}
      className="p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg text-white bg-violet-600 fixed z-50 bottom-4 right-4"
    >
      <FiAlertCircle className="text-3xl absolute -top-4 -left-4 p-2 rounded-full bg-white text-violet-600 shadow" />
      <span>{text}</span>
      <button onClick={() => removeNotification(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};
