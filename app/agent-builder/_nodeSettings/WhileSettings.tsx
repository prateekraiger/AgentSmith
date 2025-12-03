import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

function WhileSettings({ selectedNode, UpdateFormData }: any) {
  const [formData, setFormData] = useState({
    whileCondition: selectedNode.data.whileCondition || "",
  });

  return (
    <div>
      <h2 className="font-bold">While</h2>
      <p className="text-gray-500 mt-2">Loop Your Logic</p>
      <div className="mt-3">
        <Label>If</Label>
        <Input
          className="mt-2"
          placeholder="enter condition eg output==`any condition`"
          onChange={(e) => setFormData({ whileCondition: e.target.value })}
        />
      </div>

      <Button className="w-full mt-5">Save</Button>
    </div>
  );
}

export default WhileSettings;
