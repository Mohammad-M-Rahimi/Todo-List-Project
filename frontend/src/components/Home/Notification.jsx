// // Notification.jsx
// import React from "react";
// import { useToasts } from "react-toast-notifications";

// const Notification = () => {
//   const { addToast } = useToasts();

//   // Function to show notification
//   const showNotification = (message) => {
//     if (message) {
//       addToast(message, { appearance: "success", autoDismiss: true });
//     }
//   };

//   return (
//     <React.Fragment>
//       {/* Expose the showNotification function */}
//       {React.cloneElement(children, { showNotification })}
//     </React.Fragment>
//   );
// };

// export default Notification;
