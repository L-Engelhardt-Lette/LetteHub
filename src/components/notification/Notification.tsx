import { motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { useEffect } from "react";
import React from "react";

type NotificationType = {
  id: number;
  text: string;
  variant?: "success" | "error" | "warning" | "info";
};

const variantStyles = {
  success: "bg-success text-successcontent",
  error: "bg-error text-errorcontent",
  warning: "bg-warning text-warningcontent",
  info: "bg-primary text-primarycontent",
};

const Notification = ({
  text,
  id,
  variant = "info",
  removeNotif,
}: NotificationType & { removeNotif: Function }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, 5000); // Remove notification after 5 seconds

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -15, opacity: 0 }}
      transition={{ type: "spring" }}
      className={`p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg fixed z-50 bottom-4 right-4 ${variantStyles[variant]}`}
    >
      {variant === "success" ? (
        <FiCheckCircle className="text-3xl text-success" />
      ) : variant === "error" ? (
        <FiAlertCircle className="text-3xl text-error" />
      ) : (
        <FiAlertCircle className="text-3xl text-primary" />
      )}
      <span className="ml-4">{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default Notification;
