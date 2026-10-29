import { NextResponse } from "next/server";

// A static GET response is compatible with Next.js output: "export".
// GitHub Pages publishes the generated JSON file alongside the static site.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    status: "ok",
    application: "AGENTVERSE",
    mode: "demo",
    note: "UI prototype only; model calls and code execution are not configured.",
  });
}
