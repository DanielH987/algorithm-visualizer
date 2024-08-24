import React, { useState, useEffect } from 'react';
import LongCommonSub from '../components/LongCommonSub/LongCommonSub';
import { FaEyeSlash } from 'react-icons/fa';
import Modal from '../components/Modal/Modal';

const Qlcs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <LongCommonSub />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the QLCS Page!</h2>
        <p>Given two strings, find the <strong>longest common subsequence (LCS)</strong>. Report both the length of the LCS and an example subsequence of that length.</p>
        <p>You'll see a <strong>"Correct!"</strong> message once you've successfully completed the algorithm. Press the <FaEyeSlash /> button for help.</p>
        <p>Click <strong>"Generate New"</strong> to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qlcs;
