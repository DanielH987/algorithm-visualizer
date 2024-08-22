import React, { useState, useEffect } from 'react';
import MinSpanTree from '../components/MinSpanTree/MinSpanTree';
import Modal from '../components/Modal/Modal';

const generateGraphData = (numNodes) => {
  const nodes = [];
  const links = [];

  // Ensure numNodes does not exceed 26 (A-Z)
  const limitedNumNodes = Math.min(numNodes, 26);

  // Generate nodes as capital letters
  for (let i = 0; i < limitedNumNodes; i++) {
    const nodeId = String.fromCharCode(65 + i); // Convert to A, B, C, etc.
    nodes.push({ id: nodeId });
  }

  // Generate links with random weights
  for (let i = 0; i < limitedNumNodes; i++) {
    for (let j = i + 1; j < limitedNumNodes; j++) {
      const weight = Math.floor(Math.random() * 20) + 1; // Random weight between 1 and 20
      links.push({
        source: nodes[i].id,
        target: nodes[j].id,
        weight: weight,
      });
    }
  }

  return { nodes, links };
};

const Qmst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    setIsModalOpen(true);

    // Generate random graph data with 6 nodes (capital letters)
    const { nodes, links } = generateGraphData(6);
    setGraphData({ nodes, links });
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2>Preparation for Quiz QMST</h2>
      <MinSpanTree nodes={graphData.nodes} links={graphData.links} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qmst Page!</h2>
        <p>Coming out soon!</p>
      </Modal>
    </div>
  );
};

export default Qmst;
