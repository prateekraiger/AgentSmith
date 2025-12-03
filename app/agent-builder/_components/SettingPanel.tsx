import { WorkflowContext } from "@/context/WorkflowContext";
import React, { useContext } from "react";
import AgentSetttings from "../_nodeSettings/AgentSettings";
import EndSettings from "../_nodeSettings/EndSettings"; // Added this import
import { toast } from "sonner";

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
      </div>
    )
  );
}

export default SettingPanel;
