import React, { useState, useEffect } from 'react';
import Tree from '../components/Heap/Tree';
import Modal from '../components/Modal';

const Qhp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Tree />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qhp Page!</h2>
        <p>Use the BUILD-MAX-HEAP algorithm to transform the binary tree represented by the array of numbers above. Simply drag and drop each number to its correct position in the tree.</p>
        <p>You'll see a "Correct!" message once you've successfully completed the algorithm.</p>
        <p>Click "Generate New tree" to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qhp;
