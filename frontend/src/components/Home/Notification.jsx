// NotificationButton.jsx
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const NotificationButton = () => {
  const handleButtonClick = () => {
    toast.success("Notification from button click!");
  };

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default NotificationButton;
