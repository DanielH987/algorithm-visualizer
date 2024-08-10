import React, { useState, useEffect } from 'react';
import Huffman from '../components/Huffman/Huffman';
import Modal from '../components/Modal';

const Qhuf = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Huffman />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the QHUF Page!</h2>
        <p>(1) Report the total bits used (sum of length times frequency for each letter).</p>
        <p>(2) Show a correct Huffman code for each letter.</p>
        <p>You'll see a "Correct!" message once you've successfully calculated the total bits and generated the Huffman codes.</p>
        <p>Click "Generate New" to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qhuf;
