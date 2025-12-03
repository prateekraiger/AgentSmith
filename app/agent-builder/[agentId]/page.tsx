"use client";
import { useCallback, useContext, useState, useEffect } from "react";
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
  useOnSelectionChange,
  OnSelectionChangeParams,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "../_customNodes/StartNode";
import AgentNode from "../_customNodes/AgentNode";
import AgentToolsPanel from "../_components/AgentToolsPanel";
import { WorkflowContext } from "@/context/WorkflowContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Agent } from "@/types/AgentType";
import { toast } from "sonner";
import EndNode from "../_customNodes/EndNode";
import IfElseNode from "../_customNodes/IfElseNode";
import WhileNode from "../_customNodes/WhileNode";
import UserAprovalNode from "../_customNodes/UserApprovalNode";
import ApiNode from "../_customNodes/ApiNode";
import SettingPanel from "../_components/SettingPanel";

const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserAprovalNode: UserAprovalNode,
  ApiNode: ApiNode,
};

function AgentBuilder() {
  const {
    addedNodes: nodes,
    setAddedNodes: setNodes,
    nodeEdges: edges,
    setNodeEdges: setEdges,
    setSelectedNode,
    selectedNode,
    saveTrigger,
    setSaveTrigger,
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
  const router = useRouter();
  const [agentDetail, setAgentDetail] = useState<Agent>();
  useEffect(() => {
    GetAgentDetail();
  }, []);

  useEffect(() => {
    if (saveTrigger) {
      SaveNodesAndEdges();
      setSaveTrigger(false);
    }
  }, [saveTrigger]);

  useEffect(() => {
    if (agentDetail) {
      if (agentDetail.nodes && agentDetail.nodes.length > 0) {
        setNodes(agentDetail.nodes);
      }
      if (agentDetail.edges) {
        setEdges(agentDetail.edges);
      }
    }
  }, [agentDetail]);

  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string,
    });

    if (!result) {
      toast.error("Agent not found. Redirecting to dashboard.");
      router.push("/dashboard");
    } else {
      setAgentDetail(result);
    }
  };

  const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail);

  const SaveNodesAndEdges = async () => {
    if (!agentDetail) {
      toast.error("Agent details not loaded yet. Please wait and try again.");
      return;
    }
    const result = await UpdateAgentDetail({
      id: agentDetail._id,
      nodes: nodes,
      edges: edges,
    });
    toast.success("Saved");
  };

  const onNodeSelect = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      setSelectedNode(nodes[0]);
      console.log(nodes[0]);
    },
    [setSelectedNode]
  );

  useOnSelectionChange({
    onChange: onNodeSelect,
  });

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
          <Panel position="top-right">
            <SettingPanel />
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default AgentBuilder;
