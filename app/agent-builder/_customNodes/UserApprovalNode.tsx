import { Button } from "@/components/ui/button";
import { Handle, Position } from "@xyflow/react";
import { ThumbsUp } from "lucide-react";
import React from "react";

const handleStyle = { top: 20 };

function UserApprovalNode({ data }: any) {
  return (
    <div className="bg-white rounded-2xl p-2 px-4 border">
      <div className="flex gap-2 items-center">
        <ThumbsUp
          className="p-2 rounded-lg w-8 h-8 "
          style={{
            backgroundColor: data?.bgColor,
          }}
        />
        <h2>UserApproval</h2>
      </div>
      <div className="max-w-[140px] flex flex-col gap-2 mt-2">
        <Button variant={"outline"} disabled>
          Approve
        </Button>
        <Button variant={"outline"} disabled>
          Reject
        </Button>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id={"approve"} />
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
        id={"reject"}
      />
    </div>
  );
}

export default UserApprovalNode;
