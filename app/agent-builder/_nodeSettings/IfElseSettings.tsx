import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

function IfElseSettings({ selectedNode, UpdateFormData }: any) {
  const defaultFormData = {
    name: "If/Else",
    condition: "",
  };

  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...selectedNode.data,
  });

  useEffect(() => {
    setFormData({
      ...defaultFormData,
      ...selectedNode.data,
    });
  }, [selectedNode]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    UpdateFormData(formData);
  };

  return (
    <div>
      <h2 className="font-bold">If / Else </h2>
      <p className="text-gray-500 mt-2">
        Create Conditions to branch your workflow
      </p>
      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input
          placeholder="If/Else Node"
          value={formData.name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </div>
      <div className="mt-3">
        <Label>If</Label>
        <Input
          className="mt-2"
          placeholder="enter condition eg output==`any condition`"
          value={formData.condition}
          onChange={(event) => handleChange("condition", event.target.value)}
        />
      </div>

      <Button className="w-full mt-5" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}

export default IfElseSettings;
