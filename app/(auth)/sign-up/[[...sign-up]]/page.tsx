import { SignUp } from "@clerk/nextjs";
import { Sign } from "node:crypto";

export default function Page() {
  return (
    <div className=" flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
}
