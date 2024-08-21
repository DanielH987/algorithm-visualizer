import React, { useState, useEffect } from 'react';
import BinarySearchTree from '../components/BinarySearchTree/BinarySearchTree';
import Modal from '../components/Modal/Modal';
import CorrectBinarySearchTree from '../components/BinarySearchTree/CorrectBinarySearchTree'; 

const Qbst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [showCorrectTree, setShowCorrectTree] = useState(false); 

  // Function to generate an array of random integers
  const generateRandomNumbers = () => {
    const size = 7;
    const min = 1;
    const max = 50;
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  // Generate random numbers once when the component mounts
  useEffect(() => {
    setRandomNumbers(generateRandomNumbers());
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateNew = () => {
    setRandomNumbers(generateRandomNumbers());
    setShowCorrectTree(false); // Reset to hide the correct tree when generating new numbers
  };

  const handleShowAnswer = () => {
    setShowCorrectTree(!showCorrectTree); // Toggle the correct tree
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Preparation for Quiz QBST</h2>

      <div style={{ display: showCorrectTree ? 'none' : 'block' }}>
        <BinarySearchTree randomNumbers={randomNumbers} />
      </div>
      
      <div style={{ display: showCorrectTree ? 'block' : 'none' }}>
        <CorrectBinarySearchTree randomNumbers={randomNumbers} />
      </div>

      <button className='styled-button' onClick={handleGenerateNew} style={{ marginTop: '20px' }}>Generate New</button>
      <button className='styled-button' onClick={handleShowAnswer} style={{ marginTop: '20px' }}>{!showCorrectTree ? 'Show Answer' : 'Hide Answer'}</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qbst Page!</h2>
        <p>Insert the following numbers, in order, into an empty binary search tree. Draw the resulting tree.</p>
        <p>You'll see a "Correct!" message once you've successfully completed the algorithm.</p>
        <p>Click "Generate New" to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qbst;
