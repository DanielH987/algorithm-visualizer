import React, { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import './MinSpanTree.css';

const GraphComponent = ({ nodes, links }) => {
  const graphRef = useRef();

  useEffect(() => {
    const graph = graphRef.current;

    graph.d3Force('link').distance(200);
    graph.d3Force('charge').strength(-200);
  }, []);

  return (
    <div className="graph-container">
      <ForceGraph2D
        ref={graphRef}
        graphData={{ nodes, links }}
        nodeId="id"
        linkWidth={(link) => Math.sqrt(link.weight)}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkLabel={(link) => `Weight: ${link.weight}`}
        nodeAutoColorBy={null}
        enableZoomInteraction={false}
        enablePanInteraction={false}  // Disable graph panning
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
