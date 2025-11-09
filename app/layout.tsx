import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "./Provider";

export const metadata: Metadata = {
  title: "AgentSmith",
  description: "This is ai agent builder built with LangChain and Next.js",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <ConvexClientProvider>
            <Provider>{children}</Provider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
