import React, { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const GraphComponent = () => {
  const fgRef = useRef();

  // Graph data
  const graphData = {
    nodes: [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
      { id: 'd' },
      { id: 'e' },
      { id: 'f' },
    ],
    links: [
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
    ],
  };

  // Use effect to zoom to fit the graph on mount
  useEffect(() => {
    fgRef.current.zoomToFit(400, 100);
  }, []);

  return (
    <div>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="id"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        linkWidth={link => Math.sqrt(link.weight) / 2} // Scales link width based on weight
        linkLabel={link => `Weight: ${link.weight}`} // Shows weight on hover
        nodeLabel={node => `Node: ${node.id}`} // Shows node id on hover
      />
    </div>
  );
};

export default GraphComponent;
