import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal/Modal';

const Qbst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qbst Page!</h2>
      </Modal>
    </div>
  );
};

export default Qbst;
