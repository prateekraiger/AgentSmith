import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

function CreateAgentSection() {
  return (
    <div className="space-y-2 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl">Create AI Agent</h2>
      <p className="text-lg">
        Build a AI Agent Workflow with custom logic and tools
      </p>
      <Button size={"lg"}>
        <Plus />
        Create Agent
      </Button>
    </div>
  );
}

export default CreateAgentSection;
