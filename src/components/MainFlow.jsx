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
import Modalemail from "./modalemail";
import WaitDelay from "./waitDelay";

// Custom Node Component
const CustomNode = ({ data, onDelete, Open }) => (
  <div
    style={{
      width: "150%",
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
    <Handle
      type="target"
      position="top"
      style={{ background: "#1890ff", top: -10 }}
    />
    <div className="flex flex-col justify-center items-center">
      <span>{data.label}</span>
      <IoMdAdd
        onClick={() => Open(data.Id)}
        style={{ cursor: "pointer" }}
        size={20}
        color="#4A90E2"
      />
    </div>
    <IoIosCloseCircleOutline
      onClick={() => onDelete(data.Id)} // Use the correct ID property
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

// Define Node Types
const nodeTypes = {
  custom: (props) => (
    <CustomNode
      {...props}
      onDelete={props.data.onDelete}
      Open={props.data.Open}
    />
  ),
};

export default function MainFlow({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [deletedNodeIds, setDeletedNodeIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [delayOpen, setDelayOpen] = useState(false);

  // Update Nodes When Data Changes
  useEffect(() => {
    if (data && data.length > 0) {
      const newNodes = data
        .map((item, index) => ({
          id: item.id.toString(), // Ensure IDs are consistent
          type: "custom",
          position: { x: 100 * (index + 1), y: 100 },
          data: {
            Id: item.id.toString(), // Ensure IDs are passed correctly
            label: item?.name || "Default Label",
            onDelete: handleDelete,
            Open: handleOpen,
          },
        }))
        .filter((node) => !deletedNodeIds.includes(node.id));

      setNodes((prev) => {
        const existingNodeIds = prev.map((node) => node.id);
        return [
          ...prev,
          ...newNodes.filter((node) => !existingNodeIds.includes(node.id)),
        ];
      });
    } else {
      setNodes([]);
    }
  }, [data, setNodes, deletedNodeIds]);

  // Handle Connections
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
      setNodes((nds) => nds.filter((node) => node.data.Id !== id));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== id && edge.target !== id)
      );
      setDeletedNodeIds((prev) => [...prev, id]);
    },
    [setNodes, setEdges]
  );

  // Handle Opening Modals
  const handleOpen = (id) => {
    const matchingNode = data.find((val) => val.id.toString() === id);
    if (matchingNode?.name === "cold email") setOpen(true);
    if (matchingNode?.name === "Wait delay") setDelayOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleDelayClose = () => setDelayOpen(false);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />

      {open && <Modalemail open={open} onClose={handleClose} />}
      {delayOpen && <WaitDelay open={delayOpen} onClose={handleDelayClose} />}
    </div>
  );
}
