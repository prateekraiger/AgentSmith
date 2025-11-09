import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Agent builder</h1>
      <UserButton />
    </div>
  );
}
