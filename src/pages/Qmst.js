import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal/Modal';

const Qmst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3>Coming out soon!</h3>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qmst Page!</h2>
        <p>Coming out soon!</p>
      </Modal>
    </div>
  );
};

export default Qmst;
