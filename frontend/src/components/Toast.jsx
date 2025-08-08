import React, { createContext, useContext, useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add new toast
  const showToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, isClosing: false }]);

    // Start fade out after duration
    setTimeout(() => {
      // Mark toast as closing (trigger fade-out animation)
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, isClosing: true } : toast
        )
      );

      // Actually remove toast after fade-out duration (300ms)
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300); // must match fade-out animation duration
    }, duration);
  }, []);

  // Remove toast on manual close with fade out
  const removeToast = useCallback((id) => {
    // Mark toast as closing
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );

    // Remove after animation ends
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-[80px] w-full z-50 flex flex-col">
        {toasts.map(({ id, message, type, isClosing }) => (
          <Toast
            key={id}
            id={id}
            type={type}
            isClosing={isClosing}
            onClose={() => removeToast(id)}
            fullWidth
          >
            {message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ id, type, onClose, children, isClosing }) {
  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-400 text-white",
    warning: "bg-yellow-400 text-black",
    info: "bg-blue-600 text-white",
  };

  return (
    <div
      className={`flex md:text-sm text-xs font-semibold items-center justify-between p-4 shadow-lg
        ${colors[type]} 
        ${isClosing ? "animate-fade-out" : "animate-fade-in"}
      `}
      role="alert"
    >
      <div>{children}</div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-4 font-bold hover:opacity-75"
      >
        <IoMdClose className="text-sm sm:text-lg" />
      </button>
    </div>
  );
}
