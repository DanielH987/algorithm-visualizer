import React, { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const GraphComponent = () => {
  const graphRef = useRef();

  const nodes = [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
    { id: 'E' },
    { id: 'F' },
  ];

  const links = [
    { source: 'A', target: 'B', weight: 22 },
    { source: 'A', target: 'C', weight: 20 },
    { source: 'A', target: 'D', weight: 18 },
    { source: 'A', target: 'E', weight: 21 },
    { source: 'A', target: 'F', weight: 24 },
    { source: 'B', target: 'C', weight: 22 },
    { source: 'B', target: 'D', weight: 30 },
    { source: 'B', target: 'E', weight: 14 },
    { source: 'B', target: 'F', weight: 25 },
    { source: 'C', target: 'D', weight: 13 },
    { source: 'C', target: 'E', weight: 15 },
    { source: 'C', target: 'F', weight: 14 },
    { source: 'D', target: 'E', weight: 8 },
    { source: 'D', target: 'F', weight: 18 },
    { source: 'E', target: 'F', weight: 20 },
  ];

  useEffect(() => {
    const graph = graphRef.current;

    graph.d3Force('link').distance(200);
    graph.d3Force('charge').strength(-200);
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        ref={graphRef}
        graphData={{ nodes, links }}
        nodeId="id"
        linkWidth={link => Math.sqrt(link.weight)}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkLabel={link => `Weight: ${link.weight}`}
        nodeAutoColorBy={null}
        enableZoomInteraction={false}
        linkDirectionalParticles={0}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 25 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'black';
          ctx.stroke();
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default GraphComponent;
