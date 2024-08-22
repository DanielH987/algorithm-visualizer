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
        enablePanInteraction={false}
        linkDirectionalParticles={0}
        enableNodeDrag={true} // Enabling node drag
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 25 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Draw the node circle
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'black';
          ctx.stroke();

          // Draw the node label
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x, node.y);
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          // This handles making the entire node area interactive (including dragging)
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
      />
    </div>
  );
};

export default GraphComponent;
