import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { FileJson } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function AgentSettings({ selectedNode, UpdateFormData }: any) {
  const [formData, setFormData] = useState({
    name: "",
    instruction: "",
    includeChatHistory: true,
    model: "gemini-2.5-pro",
    output: "text",
    schema: "",
  });

  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      selectedNode?.data?.settings;
    }
  }, [selectedNode]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
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
      <h2 className="font-bold">Agent</h2>
      <p className="text-gray-500 mt-2">
        Call the AI Model with your instruction
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
        <Label>Instruction</Label>
        <Textarea
          placeholder="Instruction"
          value={formData?.instruction}
          onChange={(event) => handleChange("instruction", event.target.value)}
        />
        <h2 className="text-sm p-1 flex gap-2 ">
          Add Context <FileJson className="h-3 w-3" />
        </h2>
      </div>

      <div className="mt-3 space-y-1 flex justify-between ">
        <Label>Include Chat History</Label>
        <Switch
          checked={formData.includeChatHistory}
          onCheckedChange={(checked) =>
            handleChange("includeChatHistory", checked)
          }
        />
      </div>

      <div className="mt-3 flex justify-between items-center">
        <Label>Model</Label>
        <Select
          value={formData.model}
          onValueChange={(value) => handleChange("model", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="gemini-2.5-pro"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini-1.5-pro">gemini-1.5-pro</SelectItem>
            <SelectItem value="gemini-2.0-pro">gemini-2.0-pro</SelectItem>
            <SelectItem value="gemini-2.5-pro">gemini-2.5-pro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Output Format</Label>
        <Tabs value={formData.output} defaultValue="Text" className="w-full">
          <TabsList>
            <TabsTrigger value="Text">Text</TabsTrigger>
            <TabsTrigger value="Json">Json</TabsTrigger>
          </TabsList>
          <TabsContent value="Text">
            <h2 className="text-sm text-gray-500">Output will be Text</h2>
          </TabsContent>
          <TabsContent value="Json">
            <Label className="text-sm text-gray-500">Enter Json Schema</Label>
            <Textarea
              value={formData.schema}
              placeholder="{title:string}"
              className="max-w-[300px] mt-2"
              onChange={(event) => handleChange("schema", event.target.value)}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Button className="w-full mt-5" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}

export default AgentSettings;
