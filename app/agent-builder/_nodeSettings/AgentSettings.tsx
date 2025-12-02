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

function AgentSettings({ selectedNode }: any) {
  return (
    <div>
      <h2 className="font-bold">Agent</h2>
      <p className="text-gray-500 mt-2">
        Call the AI Model with your instruction
      </p>
      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input placeholder="Agent Name" />
      </div>
      <div className="mt-3 space-y-1">
        <Label>Instruction</Label>
        <Textarea placeholder="Instruction" />
        <h2 className="text-sm p-1 flex gap-2 ">
          Add Context <FileJson className="h-3 w-3" />
        </h2>
      </div>

      <div className="mt-3 space-y-1 flex justify-between ">
        <Label>Include Chat History</Label>
        <Switch checked={true} />
      </div>

      <div className="mt-3 flex justify-between items-center">
        <Label>Model</Label>
        <Select>
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
        <Tabs defaultValue="Text" className="w-[400px]">
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
              placeholder="{title:string}"
              className="max-w-[300px] mt-2"
            />
          </TabsContent>
        </Tabs>
      </div>
      <Button className="w-full mt-5">Save</Button>
    </div>
  );
}

export default AgentSettings;
