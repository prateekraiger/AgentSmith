import { WorkflowContext } from "@/context/WorkflowContext";
import React, { useContext } from "react";
import AgentSetttings from "../_nodeSettings/AgentSettings";

function SettingPanel() {
  const { selectedNode } = useContext(WorkflowContext);

  return (
    <div className="p-5 bg-white rounded-2xl w-[350px] shadow max-h-[600px] overflow-y-auto">
      <AgentSetttings selectedNode={selectedNode} />
    </div>
  );
}

export default SettingPanel;
