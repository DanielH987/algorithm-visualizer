import React, { useState, useEffect } from 'react';
import QuicksortPartition from '../components/QuicksortPartition';
import Modal from '../components/Modal';

const Qqp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <QuicksortPartition />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the QQP Page!</h2>
        <p>Use the PARTITION algorithm to transform the arrays of numbers provided, using the last number as the pivot. After arranging the numbers, click the "Show Answer" button to check your work.</p>
        <p>You'll see a "Correct!" message once you've successfully completed the algorithm.</p>
        <p>Click "Generate New List" to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qqp;
