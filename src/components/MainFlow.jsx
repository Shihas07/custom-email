import React, { useEffect ,useCallback} from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,addEdge
 
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function MainFlow({ data }) {
  // Initialize nodes state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Map through the data array to create multiple nodes
      const newNodes = data.map((item, index) => ({
        id: `${index + 1}`, // Generate unique id for each node
        position: { x: 100 * (index + 1), y: 100 }, // Offset position for better visualization
        data: { label: item?.name || "Default Label" },
      }));
      setNodes(newNodes); // Set all nodes at once
    } else {
      // Clear nodes when data is empty or invalid
      setNodes([]);
    }
  }, [data, setNodes]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
