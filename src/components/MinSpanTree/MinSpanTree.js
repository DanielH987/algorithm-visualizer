import React, { useEffect, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import './MinSpanTree.css';

const GraphComponent = ({ nodes, links, onNodeClick, onLinkClick, resetGraph }) => {
  const graphRef = useRef();
  const [clickedNodes, setClickedNodes] = useState({});
  const [clickedLinks, setClickedLinks] = useState({});

  useEffect(() => {
    if (resetGraph) {
      setClickedNodes({});
      setClickedLinks({});
    }
  }, [resetGraph]);

  useEffect(() => {
    const graph = graphRef.current;

    graph.d3Force('link').distance(200);
    graph.d3Force('charge').strength(-200);
  }, []);

  const handleNodeClick = (node) => {
    setClickedNodes((prevClickedNodes) => ({
      ...prevClickedNodes,
      [node.id]: !prevClickedNodes[node.id],
    }));
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleLinkClick = (link) => {
    setClickedLinks((prevClickedLinks) => ({
      ...prevClickedLinks,
      [`${link.source.id}-${link.target.id}`]: !prevClickedLinks[`${link.source.id}-${link.target.id}`],
    }));

    if (onLinkClick) {
      onLinkClick(link);
    }
  };

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
        enableNodeDrag={true}
        onNodeClick={handleNodeClick}
        onLinkClick={handleLinkClick}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 25 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
          ctx.fill();

          ctx.lineWidth = 1;
          ctx.strokeStyle = clickedNodes[node.id] ? 'red' : 'black';
          ctx.stroke();

          ctx.fillStyle = clickedNodes[node.id] ? 'red' : 'black';
          ctx.fillText(label, node.x, node.y);
        }}
        linkCanvasObjectMode={() => 'after'}
        linkCanvasObject={(link, ctx, globalScale) => {
          const isClicked = clickedLinks[`${link.source.id}-${link.target.id}`];
          
          const lineWidth = isClicked ? 1.5 : 1;
          ctx.lineWidth = lineWidth;

          ctx.strokeStyle = isClicked ? 'red' : 'black';
          const x0 = link.source.x;
          const y0 = link.source.y;
          const x1 = link.target.x;
          const y1 = link.target.y;

          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();

          const arrowSize = 5 / globalScale;
          const angle = Math.atan2(y1 - y0, x1 - x0);

          ctx.fillStyle = isClicked ? 'red' : 'black';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(
            x1 - arrowSize * Math.cos(angle - Math.PI / 6),
            y1 - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            x1 - arrowSize * Math.cos(angle + Math.PI / 6),
            y1 - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.lineTo(x1, y1);
          ctx.closePath();
          ctx.fill();
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
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
