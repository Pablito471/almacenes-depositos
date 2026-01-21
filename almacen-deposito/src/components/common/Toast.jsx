"use client";

import { useEffect, useState } from "react";
import { FiX, FiTruck, FiCheckCircle } from "react-icons/fi";

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    shipping: "bg-purple-50 border-purple-200 text-purple-800",
  };

  const getIcon = () => {
    switch (type) {
      case "shipping":
        return <FiTruck className="text-2xl" />;
      case "success":
        return <FiCheckCircle className="text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 border rounded-lg p-4 shadow-lg flex items-center gap-3 max-w-md animate-slide-in ${typeStyles[type]}`}
    >
      {getIcon()}
      <div className="flex-1">
        <p className="font-semibold">{message}</p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-current hover:opacity-70 transition-opacity"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}
