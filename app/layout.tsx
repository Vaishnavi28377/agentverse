import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGENTVERSE — Your AI Company",
  description: "A living 3D workspace for a team of AI software agents.",
  applicationName: "AGENTVERSE",
};

export const viewport: Viewport = { themeColor: "#070a13", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
