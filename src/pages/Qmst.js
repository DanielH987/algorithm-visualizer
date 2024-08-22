import React, { useState, useEffect } from 'react';
import MinSpanTree from '../components/MinSpanTree/MinSpanTree';
import Modal from '../components/Modal/Modal';
import '../components/MinSpanTree/MinSpanTree.css';

const generateGraphData = (numNodes) => {
  const nodes = [];
  const links = [];

  const limitedNumNodes = Math.min(numNodes, 26);

  for (let i = 0; i < limitedNumNodes; i++) {
    const nodeId = String.fromCharCode(65 + i);
    nodes.push({ id: nodeId });
  }

  for (let i = 0; i < limitedNumNodes; i++) {
    for (let j = i + 1; j < limitedNumNodes; j++) {
      const weight = Math.floor(Math.random() * 20) + 1;
      links.push({
        source: nodes[i].id,
        target: nodes[j].id,
        weight: weight,
      });
    }
  }

  return { nodes, links };
};

const formatGraphText = (nodes, links) => {
  const vertices = `Vertices: ${nodes.map(node => node.id.toLowerCase()).join(' ')}`;
  const edges = links.map(link => `${link.source.toLowerCase()}.${link.target.toLowerCase()}.${link.weight}`).join('  ');
  return `${vertices}\n${edges}`;
};

const Qmst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [graphText, setGraphText] = useState('');
  const [clickedNodes, setClickedNodes] = useState([]);
  const [clickedLinks, setClickedLinks] = useState([]); // Store clicked links and weights

  useEffect(() => {
    setIsModalOpen(true);

    const { nodes, links } = generateGraphData(6);
    setGraphData({ nodes, links });

    const formattedText = formatGraphText(nodes, links);
    setGraphText(formattedText);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNodeClick = (node) => {
    setClickedNodes((prevNodes) => {
      if (prevNodes.includes(node.id)) {
        return prevNodes.filter(n => n !== node.id);
      } else {
        return [...prevNodes, node.id];
      }
    });
  };

  const handleLinkClick = (link) => {
    const linkInfo = `${link.source.id}-${link.target.id} (Weight: ${link.weight})`;
    setClickedLinks((prevLinks) => {
      if (prevLinks.includes(linkInfo)) {
        return prevLinks.filter(l => l !== linkInfo);
      } else {
        return [...prevLinks, linkInfo];
      }
    });
  };

  return (
    <div className="qmst-container">
      <div className="qmst-text-container">
        <h2>Preparation for Quiz QMST</h2>
        <pre className="qmst-pre">{graphText}</pre>
        <div>Clicked Nodes: {clickedNodes.join(', ')}</div>
        <div>Clicked Links: {clickedLinks.join(', ')}</div> {/* Display clicked links */}
      </div>
      <div className="qmst-graph-container">
        <MinSpanTree
          nodes={graphData.nodes}
          links={graphData.links}
          onNodeClick={handleNodeClick}
          onLinkClick={handleLinkClick} // Pass the link click handler
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qmst Page!</h2>
        <p>Coming out soon!</p>
      </Modal>
    </div>
  );
};

export default Qmst;
