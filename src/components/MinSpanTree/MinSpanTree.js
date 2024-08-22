import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

const GraphComponent = () => {
  // Define the vertices (nodes) and edges (links)
  const nodes = [
    { id: 'a' },
    { id: 'b' },
    { id: 'c' },
    { id: 'd' },
    { id: 'e' },
    { id: 'f' },
  ];

  const links = [
    { source: 'a', target: 'b', weight: 22 },
    { source: 'a', target: 'c', weight: 20 },
    { source: 'a', target: 'd', weight: 18 },
    { source: 'a', target: 'e', weight: 21 },
    { source: 'a', target: 'f', weight: 24 },
    { source: 'b', target: 'c', weight: 22 },
    { source: 'b', target: 'd', weight: 30 },
    { source: 'b', target: 'e', weight: 14 },
    { source: 'b', target: 'f', weight: 25 },
    { source: 'c', target: 'd', weight: 13 },
    { source: 'c', target: 'e', weight: 15 },
    { source: 'c', target: 'f', weight: 14 },
    { source: 'd', target: 'e', weight: 8 },
    { source: 'd', target: 'f', weight: 18 },
    { source: 'e', target: 'f', weight: 20 },
  ];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeId="id"
        linkWidth={link => Math.sqrt(link.weight)}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkLabel={link => `Weight: ${link.weight}`}
        nodeAutoColorBy="id"
        enableZoomInteraction={false} // Disable zooming
      />
    </div>
  );
};

export default GraphComponent;
