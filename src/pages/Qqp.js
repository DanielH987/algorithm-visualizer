import React, { useState, useEffect } from 'react';
import QuicksortPartition from '../components/Quicksort/QuicksortPartition';
import { FaEyeSlash } from 'react-icons/fa';
import Modal from '../components/Modal/Modal';

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
        <p>Use the <strong>PARTITION</strong> algorithm to rearrange the array of numbers provided. The last number in the array will serve as the pivot. After arranging the numbers, click the <strong>"Show Answer"</strong> button to check your work.</p>
        <p>You'll see a <strong>"Correct!"</strong> message once you've successfully completed the algorithm. Press the <FaEyeSlash /> button for help.</p>
        <p>Click <strong>"Generate New List"</strong> to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qqp;
