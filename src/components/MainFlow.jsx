import React, { useEffect, useCallback } from "react";
import{ ReactFlow, 
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

// Step 1: Create a Custom Node Component with Handles
const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid #4A90E2",
        borderRadius: "8px",
        backgroundColor: "#fff",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        position: "relative", // Required for correct handle positioning
      }}
    >
      {/* Source and Target Handles */}
      <Handle
        type="target"
        position="top"
        style={{ background: "#1890ff", top: -10 }}
      />
      
      <span>{data.label}</span>
      <IoIosCloseCircleOutline  style={{cursor:"pointer"}} size={20} color="#4A90E2" />
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#1890ff", bottom: -10 }}
      />
    </div>
  );
};

const nodeTypes = { custom: CustomNode }; // Register custom node type

export default function MainFlow({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newNodes = data.map((item, index) => ({
        id: `${index + 1}`,
        type: "custom", // Use custom node type
        position: { x: 100 * (index + 1), y: 100 },
        data: { label: item?.name || "Default Label" },
      }));

      setNodes((prev) => {
        const existingNodeIds = prev.map((node) => node.id);
        const mergedNodes = [
          ...prev,
          ...newNodes.filter((node) => !existingNodeIds.includes(node.id)),
        ];
        return mergedNodes;
      });
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
        nodeTypes={nodeTypes} // Provide custom node types
      />
    </div>
  );
}
