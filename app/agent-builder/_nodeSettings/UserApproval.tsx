import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

function UserApproval({ selectedNode, UpdateFormData }: any) {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    console.log(formData);
    UpdateFormData(formData);
  };
  return (
    <div>
      <h2 className="font-bold">User Approval</h2>
      <p className="text-gray-500 mt-2">
        Pause for a human to approve or reject a step
      </p>
      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input
          placeholder="Agent Name"
          value={formData?.name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </div>
      <div className="mt-3 space-y-1">
        <Label>Message</Label>
        <Textarea
          placeholder="describe the message to show to user"
          value={formData?.message}
          onChange={(event) => handleChange("message", event.target.value)}
        />
      </div>

      <Button className="w-full mt-5" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}

export default UserApproval;
