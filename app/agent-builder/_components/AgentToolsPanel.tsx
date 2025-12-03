import { WorkflowContext } from "@/context/WorkflowContext";
import { Position } from "@xyflow/react";
import {
  Merge,
  MousePointer,
  Repeat,
  Square,
  ThumbsUp,
  Webhook,
} from "lucide-react";
import React, { useContext } from "react";

const AgentTools = [
  {
    name: "Agent",
    icons: MousePointer,
    bgColor: "#CDF7E3",
    id: "agent",
    type: "AgentNode",
  },
  {
    name: "End",
    icons: Square,
    bgColor: "#FFE3E3",
    id: "end",
    type: "EndNode",
  },

  {
    name: "If/Else",
    icons: Merge,
    bgColor: "#FFF3CD",
    id: "IfElse",
    type: "IfElseNode",
  },
  {
    name: "While",
    icons: Repeat,
    bgColor: "#E3F2FD",
    id: "while",
    type: "WhileNode",
  },

  {
    name: "User Approval",
    icons: ThumbsUp,
    bgColor: "#EADCF8",
    id: "approval",
    type: "UserAprovalNode",
  },
  {
    name: "API",
    icons: Webhook,
    bgColor: "#D1F0FF",
    id: "api",
    type: "ApiNode",
  },
];

function AgentToolsPanel() {
  const { addedNodes, setAddedNodes } = useContext(WorkflowContext);
  const onAgentToolClick = (tool: any) => {
    const uniqueId = `${tool.id}-${Date.now()}`;
    let newNodeData: any = {
      label: tool.name,
      bgColor: tool.bgColor,
      id: uniqueId,
      type: tool.type,
    };

    // For AgentNode, create a more detailed data structure
    if (tool.type === "AgentNode") {
      newNodeData = {
        ...newNodeData,
        name: tool.name,
        instruction: "",
        includeChatHistory: true,
        model: "gemini-1.5-pro",
        output: "text",
        schema: "",
      };
    } else if (tool.type === "IfElseNode") {
      newNodeData = {
        ...newNodeData,
        name: tool.name,
        condition: "",
      };
    }

    const newNode = {
      id: uniqueId,
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Use random position to avoid overlap
      data: newNodeData,
      type: tool.type,
    };
    setAddedNodes((prev: any) => [...prev, newNode]);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <h2 className="font-semibold mb-4 text-gray-700">AI Agent Tools</h2>
      <div>
        {AgentTools.map((tools, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg mb-2"
            onClick={() => onAgentToolClick(tools)}
          >
            <tools.icons
              className="p-2 rounded-lg w-8 h-8"
              style={{ backgroundColor: tools.bgColor }}
            />
            <h2 className="text-sm font-medium tex-gray-700">{tools.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentToolsPanel;
