import React, { useState, createContext, useEffect } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    showModal: false,
    currentModal: null,
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (!modal.showModal) return;
      if (event.key === "Escape") {
        setModal({ showModal: false, currentModal: null });
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modal]);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}