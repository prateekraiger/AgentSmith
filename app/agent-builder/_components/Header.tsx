import { Button } from "@/components/ui/button";
import { ChevronLeft, Code2, Play } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center border-b ">
      <div className="flex gap=2 items-center">
        <ChevronLeft className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Agent Name</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant={"ghost"}>
          <Code2 className="mr-2 h-4 w-4" /> CODE
        </Button>
        <Button>
          <Play />
          Preview
        </Button>
        <Button>Publish</Button>
      </div>
    </div>
  );
};

export default Header;
