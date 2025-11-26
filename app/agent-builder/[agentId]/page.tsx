"use client";
import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  use,
} from "react";
import Header from "../_components/Header";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "../_components/StartNode";
import AgentNode from "../_components/AgentNode";
import AgentToolsPanel from "../_components/AgentToolsPanel";
import { WorkflowContext } from "@/context/WorkflowContext";
import { set } from "react-hook-form";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/types/AgentType";
import { toast } from "sonner";

const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
};

function AgentBuilder() {
  const {
    addedNodes: nodes,
    setAddedNodes: setNodes,
    nodeEdges: edges,
    setNodeEdges: setEdges,
  } = useContext(WorkflowContext);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: any) => setEdges((eds: any) => addEdge(connection, eds)),
    [setEdges]
  );

  const convex = useConvex();
  const { agentId } = useParams();
  const [agentDetail, setAgentDetail] = useState<Agent>();
  useEffect(() => {
    GetAgentDetail();
  }, []);

  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string,
    });
    setAgentDetail(result);
  };

  const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail);

  const SaveNodesAndEdges = async () => {
    const result = await UpdateAgentDetail({
      // @ts-ignore
      id: agentDetail?._id,
      nodes: nodes,
      edges: edges,
    });
    toast.success("Saved");
  };

  return (
    <div>
      <Header agentDetail={agentDetail} onSave={SaveNodesAndEdges} />
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          {/* @ts-ignore */}
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>
          <Panel position="top-right">Settings</Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default AgentBuilder;
