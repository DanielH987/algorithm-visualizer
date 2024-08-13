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

  const minRange = 1;
  const maxRange = 100;

  function generateRandomCharacters() {
    return Array.from({ length: 7 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65));
  }

  function generateRandomNumbers() {
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
  }

  const [randomCharacters, setRandomCharacters] = useState(generateRandomCharacters());
  const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());
  const [encodingInputs, setEncodingInputs] = useState(Array(7).fill(''));
  const [bitLengthInputs, setBitLengthInputs] = useState(Array(7).fill(''));

  const regenerate = () => {
    setRandomCharacters(generateRandomCharacters());
    setRandomNumbers(generateRandomNumbers());
    setEncodingInputs(Array(7).fill(''));
    setBitLengthInputs(Array(7).fill(''));
  };

  const handleEncodingChange = (index, value) => {
    if (/^[01]*$/.test(value)) {
        const newInputs = [...encodingInputs];
        newInputs[index] = value;
        setEncodingInputs(newInputs);
    }
  };

  const handleBitLengthChange = (index, value) => {
    if (/^\d*$/.test(value)) {
        const newInputs = [...bitLengthInputs];
        newInputs[index] = value;
        setBitLengthInputs(newInputs);
    }
  };

  return (
    <div>
      <Huffman 
        randomCharacters={randomCharacters} 
        randomNumbers={randomNumbers} 
        encodingInputs={encodingInputs}
        bitLengthInputs={bitLengthInputs}
        onEncodingChange={handleEncodingChange}
        onBitLengthChange={handleBitLengthChange}
        children={
          <button className='styled-button' onClick={regenerate}>Generate New</button>
        }
      />
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
