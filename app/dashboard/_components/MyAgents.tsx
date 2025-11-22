"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Agent } from "@/types/AgentType";
import { useConvex } from "convex/react";
import { GitBranchPlus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";

function MyAgents() {
  const { userDetail } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();

  useEffect(() => {
    if (userDetail?._id) {
      GetUserAgents();
    }
  }, [userDetail]);

  const GetUserAgents = async () => {
    if (!userDetail?._id) return;
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail._id,
    });
    console.log("User Agents: ", result);
    setAgentList(result);
  };

  if (!userDetail) {
    return <div>Loading user...</div>;
  }

  if (agentList.length === 0) {
    return (
      <div className="text-center py-10">
        <GitBranchPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">No agents found. Create your first agent!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agentList.map((agent) => (
        <Link
          href={"/agent-builder/" + agent.agentId}
          key={agent._id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow block"
        >
          <div className="flex items-center gap-3">
            <GitBranchPlus className="bg-yellow-100 p-2 rounded-sm h-8 w-8" />
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <p className="text-gray-400 text-sm">
                {moment(agent._creationTime).fromNow()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MyAgents;
