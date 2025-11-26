"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useState } from "react";
import { Workflow } from "lucide-react";
import { WorkflowContext } from "@/context/WorkflowContext";
import { Position } from "@xyflow/react";

export function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();

  const [addedNodes, setAddedNodes] = useState([
    {
      id: "start",
      position: { x: 0, y: 0 },
      data: { label: "Start" },
      type: "StartNode",
    },
  ]);

  const [nodeEdges, setNodeEdges] = useState([]);

  useEffect(() => {
    user && CreateAndGetUser();
  }, [user]);

  const CreateAndGetUser = async () => {
    if (user) {
      const result = await createUser({
        name: user.fullName ?? "",
        email: user.primaryEmailAddress?.emailAddress ?? "",
      });
      // save to context
      setUserDetail(result);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <WorkflowContext.Provider
        value={{ addedNodes, setAddedNodes, nodeEdges, setNodeEdges }}
      >
        <div>{children}</div>
      </WorkflowContext.Provider>
    </UserDetailContext.Provider>
  );
}
