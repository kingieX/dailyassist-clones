import { useState } from "react";

export const useDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [openModal, setOpenModal] = useState(null);

  const openModalById = (modalId) => setOpenModal(modalId);
  const closeModal = () => setOpenModal(null);

  return {
    activeSection,
    setActiveSection,
    openModal,
    openModalById,
    closeModal,
  };
};