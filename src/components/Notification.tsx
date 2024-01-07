// Notification.tsx
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close the notification after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed right-[8px] top-[25%] duration-300 bg-primary p-[16px] text-white rounded-[8px] ${
        clicked ? "opacity-100" : ""
      }`}
      onClick={() => {
        setClicked(true);
        onClose();
      }}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
