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
        nodeAutoColorBy={null} // Disable auto coloring
        enableZoomInteraction={false} // Disable zooming
        linkDirectionalParticles={0}  // Disable moving particles
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 25 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black'; // Text color
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'white'; // Circle color
          ctx.fill();
          ctx.lineWidth = 1; // Circle border width
          ctx.strokeStyle = 'black'; // Circle border color
          ctx.stroke();
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default GraphComponent;
