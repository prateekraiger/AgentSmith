import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function EndSettings({ selectedNode, UpdateFormData }) {
  const defaultFormData = {
    name: "End",
    outputMessage: "",
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

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    UpdateFormData(formData);
    toast.success("updated end node");
  };

  return (
    <div>
      <h2 className="font-bold">End Node</h2>
      <p className="text-gray-500 mt-2">
        Configure the end point of your workflow
      </p>
      <div className="mt-2 space-y-1">
        <Label>Output</Label>
        <Textarea
          placeholder="Message to display at the end"
          value={formData.outputMessage}
          onChange={(event) =>
            handleChange("outputMessage", event.target.value)
          }
        />
      </div>
      <Button className="w-full mt-5" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}

export default EndSettings;
