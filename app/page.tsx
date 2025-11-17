import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <main className="flex flex-col items-center justify-center p-8 text-center">
        <Image
          src="/logo.svg"
          alt="AgentSmith Logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">Welcome to AgentSmith</h1>
        <p className="text-lg text-gray-600 mb-8">
          Build your own AI agents with LangChain and Next.js
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </div>
      </main>
    </div>
  );
}