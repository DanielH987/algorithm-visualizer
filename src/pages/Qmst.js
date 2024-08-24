import React, { useState, useEffect } from 'react';
import MinSpanTree from '../components/MinSpanTree/MinSpanTree';
import Modal from '../components/Modal/Modal';
import '../components/MinSpanTree/MinSpanTree.css';

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(node1, node2) {
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 !== root2) {
      if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
      } else if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
      } else {
        this.parent[root2] = root1;
        this.rank[root1]++;
      }
    }
  }
}

const findMST = (graph) => {
  const { nodes, links } = graph;
  const nodeIndexMap = {};
  nodes.forEach((node, index) => {
    nodeIndexMap[node.id] = index;
  });

  links.sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind(nodes.length);
  const mstLinks = [];
  let totalWeight = 0;

  for (const link of links) {
    const sourceIndex = nodeIndexMap[link.source];
    const targetIndex = nodeIndexMap[link.target];

    if (uf.find(sourceIndex) !== uf.find(targetIndex)) {
      uf.union(sourceIndex, targetIndex);
      mstLinks.push(link);
      totalWeight += link.weight;

      if (mstLinks.length === nodes.length - 1) {
        break;
      }
    }
  }

  return { mstLinks, totalWeight };
};

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
      const weight = Math.floor(Math.random() * 30) + 1;
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
  const [clickedVertices, setClickedVertices] = useState([]);
  const [clickedEdges, setClickedEdges] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [correctMstWeight, setCorrectMstWeight] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [resetGraph, setResetGraph] = useState(null);

  useEffect(() => {
    setIsModalOpen(true);
    generateNewGraph();
  }, []);

  const generateNewGraph = () => {
    const { nodes, links } = generateGraphData(6);
    setGraphData({ nodes, links });
    const formattedText = formatGraphText(nodes, links);
    setGraphText(formattedText);
    setClickedVertices([]);
    setClickedEdges([]);
    setTotalWeight(0);

    setResetGraph(Date.now());

    const { totalWeight: mstTotalWeight } = findMST({ nodes, links });
    setCorrectMstWeight(mstTotalWeight);
    setShowAnswer(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVertxClick = (node) => {
    setClickedVertices((prevNodes) => {
      if (prevNodes.includes(node.id)) {
        return prevNodes.filter(n => n !== node.id);
      } else {
        return [...prevNodes, node.id];
      }
    });
  };

  const handleEdgeClick = (link) => {
    const linkInfo = `${link.source.id}-${link.target.id} (Weight: ${link.weight})`;

    setClickedEdges((prevLinks) => {
      let updatedLinks;
      if (prevLinks.includes(linkInfo)) {
        updatedLinks = prevLinks.filter(l => l !== linkInfo);
      } else {
        updatedLinks = [...prevLinks, linkInfo];
      }

      const updatedTotalWeight = updatedLinks.reduce((sum, l) => {
        const weight = parseInt(l.match(/\(Weight: (\d+)\)/)[1], 10);
        return sum + weight;
      }, 0);

      setTotalWeight(updatedTotalWeight);
      return updatedLinks;
    });
  };

  const handleShowAnswer = () => {
    if (correctMstWeight !== null) {
      setCorrectMstWeight(correctMstWeight);
      setShowAnswer(true);
    }
  };

  return (
    <div className="qmst-container">
      <div className="qmst-text-container">
        <h2>Preparation for Quiz QMST</h2>
        <pre className="qmst-pre">{graphText}</pre>
        <div className="button-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            className='styled-button'
            style={{ width: '167.17px' }}
            onClick={generateNewGraph}
          >
            Generate New
          </button>
          {!showAnswer && (
            <button
              className='styled-button'
              style={{ width: '167.17px' }}
              onClick={handleShowAnswer}
            >
              Show Answer
            </button>
          )}
        </div>
        {totalWeight === correctMstWeight ? <h3 className='correct'>Correct!</h3> : ''}
        {showAnswer && (
          <h3 className={totalWeight === correctMstWeight ? 'correct' : 'incorrect'} style={{ textAlign: 'center' }}>Total Weight: {correctMstWeight}</h3>
        )}
        <div className="qmst-columns">
          <div className="qmst-left-column">
            <h4>Clicked Vertices:</h4>
            <p style={{ textAlign: 'left' }}>{clickedVertices.join(', ')}</p>

            <h4>Clicked Edges:</h4>
            <ul>
              {clickedEdges.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </div>

          <div className="qmst-right-column">
            <div className='total-weight-container'>
              <h4>Total Weight (Auto-Calculated):</h4>
              <p>{totalWeight}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="qmst-graph-container">
        <MinSpanTree
          nodes={graphData.nodes}
          links={graphData.links}
          onNodeClick={handleVertxClick}
          onLinkClick={handleEdgeClick}
          resetGraph={resetGraph}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qmst Page!</h2>
        <p>Given a list of edges in <i>vertex.vertex.weight</i> format, discover a <strong>Minimum Spanning Tree (MST)</strong>.</p>
        <p>You can click on nodes or edges to <strong>highlight them</strong>. Highlighted nodes and edges will be listed on the page, and the <strong>total weight</strong> will be automatically calculated.</p>
        <p>If you encounter any issues when clicking on nodes or edges, consider trying a different browser to see if it resolves the problem.</p>
        <p>You'll see a <strong>"Correct!"</strong> message once you've successfully completed the algorithm.</p>
        <p>Click <strong>"Generate New"</strong> to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qmst;
