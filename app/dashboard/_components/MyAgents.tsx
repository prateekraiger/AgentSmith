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
    userDetail && GetUserAgents();
  }, [userDetail]);

  const GetUserAgents = async () => {
    if (!userDetail?.id) return;
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail.id,
    });
    console.log("User Agents: ", result);
    setAgentList(result);
  };

  return (
    <div className="w-full">
      {agentList.map((agent, index) => (
        <Link
          href={"/agent-builder/" + agent.agentId}
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4"
        >
          <GitBranchPlus className="bg-yellow-100 p-2 rounded-sm h-8 w-8" />
          <h2 className="mt-3">{agent.name}</h2>
          <h2 className="text-gray-400 text-sm">
            {moment(agent._creationTime).fromNow()}
          </h2>
        </Link>
      ))}
    </div>
  );
}

export default MyAgents;
