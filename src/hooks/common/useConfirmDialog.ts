import { useState } from "react";

export const useConfirmDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  const openModal = (onConfirm: () => void) => {
    setOnConfirmCallback(() => onConfirm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOnConfirmCallback(null);
  };

  const handleConfirm = () => {
    if (onConfirmCallback) {
      onConfirmCallback();
    }
    closeModal();
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleConfirm
  };
};
