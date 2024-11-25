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
      
      const newNodes = data.map((item, index) => ({
        id: `${index + 1}`, 
        position: { x: 100 * (index + 1), y: 100 }, // Offset position for better visualization
        data: { label: item?.name || "Default Label" },
      }));
      setNodes(newNodes); 
    } else {
     
      setNodes([]);
    }
  }, [data, setNodes]);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#1890ff" } }, eds)
      ),
    [setEdges]
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
