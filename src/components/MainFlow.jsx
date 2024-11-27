import React, { useEffect, useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

// Step 1: Create a Custom Node Component with Handles
const CustomNode = ({ data, onDelete,Open }) => {
  return (
    <div
      style={{
        width:"150%",
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
      <div className="flex flex-col justify-center items-center">
        {" "}
        <span>{data.label}</span>{" "}
        <IoMdAdd onClick={()=>Open(data.id)} style={{ cursor: "pointer" }} size={20} color="#4A90E2" />
      </div>

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
  custom: (props) => <CustomNode {...props} onDelete={props.data.onDelete }   Open={props.data.Open} />,
};

// Step 3: Main Flow Component
export default function MainFlow({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [deletedNodeIds, setDeletedNodeIds] = useState([]);

  // Update Nodes When Data Changes
  useEffect(() => {
    if (data && data.length > 0) {
      const newNodes = data
        .map((item, index) => ({
          id: `${index + 1}`, // Node ID
          type: "custom", // Use custom node type
          position: { x: 100 * (index + 1), y: 100 },
          data: {
            id: `${index + 1}`, // Pass the ID to the node's data
            label: item?.name || "Default Label",
            onDelete: handleDelete,
            Open:handleOpen
             // Pass delete handler to node data
          },
        }))
        // Exclude nodes that are marked as deleted
        .filter((node) => !deletedNodeIds.includes(node.id));

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
  }, [data, setNodes, deletedNodeIds]);

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
      setDeletedNodeIds((prev) => [...prev, id]); // Track deleted node ID
    },
    [setNodes, setEdges]
  );

  const handleOpen=(id)=>{
      
        alert("hello")
        console.log(id)
  }

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
