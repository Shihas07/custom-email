import React, { useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

// Step 1: Create a Custom Node Component with Handles
const CustomNode = ({ data, onDelete }) => {
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
      {/* Target and Source Handles */}
      <Handle
        type="target"
        position="top"
        style={{ background: "#1890ff", top: -10 }}
      />
      <span>{data.label}</span>
      <IoIosCloseCircleOutline
        onClick={() => onDelete(data.id)} // Call the delete handler
        style={{ cursor: "pointer" }}
        size={20}
        color="#4A90E2"
      />
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#1890ff", bottom: -10 }}
      />
    </div>
  );
};

// Step 2: Define Node Types
const nodeTypes = {
  custom: (props) => <CustomNode {...props} onDelete={props.data.onDelete} />,
};

// Step 3: Main Flow Component
export default function MainFlow({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update Nodes When Data Changes
  useEffect(() => {
    if (data && data.length > 0) {
      const newNodes = data.map((item, index) => ({
        id: `${index + 1}`, // Node ID
        type: "custom", // Use custom node type
        position: { x: 100 * (index + 1), y: 100 },
        data: {
          id: `${index + 1}`, // Pass the ID to the node's data
          label: item?.name || "Default Label",
          onDelete: handleDelete, // Pass delete handler to node data
        },
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

  // Handle Connections (Edges)
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#1890ff" } },
          eds
        )
      ),
    [setEdges]
  );

  // Delete Node and Associated Edges
  const handleDelete = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== id && edge.target !== id)
      );
    },
    [setNodes, setEdges]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes} // Register custom node types
      />
    </div>
  );
}
