import { WorkflowContext } from "@/context/WorkflowContext";
import React, { useContext } from "react";
import AgentSetttings from "../_nodeSettings/AgentSettings";
import EndSettings from "../_nodeSettings/EndSettings";
import IfElseSettings from "../_nodeSettings/IfElseSettings";
import { toast } from "sonner";
import WhileSettings from "../_nodeSettings/WhileSettings";
import UserApproval from "../_nodeSettings/UserApproval";
import ApiAgentSettings from "../_nodeSettings/ApiSettings";

function SettingPanel() {
  const { selectedNode, setAddedNodes, addedNodes, setSaveTrigger } =
    useContext(WorkflowContext);

  const onUpdateNodeData = (formData: any) => {
    if (!selectedNode) return;

    const updatedNodes = addedNodes.map((node: any) => {
      if (node.id === selectedNode.id) {
        // Create a new object for the updated node
        return {
          ...node,
          data: {
            ...node.data,
            ...formData,
            label: formData.name, // Update label from form's name field
          },
        };
      }
      return node;
    });

    setAddedNodes(updatedNodes);
    setSaveTrigger(true);
    // toast.success("Agent Details Saved");
  };

  return (
    selectedNode && (
      <div className="p-5 bg-white rounded-2xl w-[350px] shadow max-h-[600px] overflow-y-auto">
        {selectedNode?.type === "AgentNode" && (
          <AgentSetttings
            selectedNode={selectedNode}
            UpdateFormData={onUpdateNodeData}
          />
        )}
        {selectedNode?.type == "EndNode" && (
          <EndSettings
            selectedNode={selectedNode}
            UpdateFormData={onUpdateNodeData}
          />
        )}
        {selectedNode?.type == "IfElseNode" && (
          <IfElseSettings
            selectedNode={selectedNode}
            UpdateFormData={onUpdateNodeData}
          />
        )}

        {selectedNode?.type == "WhileNode" && (
          <WhileSettings
            selectedNode={selectedNode}
            UpdateFormData={onUpdateNodeData}
          />
        )}

        {selectedNode?.type == "UserAprovalNode" && (
          <UserApproval
            selectedNode={selectedNode}
            UpdateFormData={onUpdateNodeData}
          />
        )}

        {selectedNode?.type == "ApiNode" && (
          <ApiAgentSettings
            selectedNode={selectedNode}
            UpdateFormData={onUpdateNodeData}
          />
        )}
      </div>
    )
  );
}

export default SettingPanel;
