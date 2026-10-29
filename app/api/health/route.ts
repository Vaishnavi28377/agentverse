import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    application: "AGENTVERSE",
    mode: "demo",
    note: "UI prototype only; model calls and code execution are not configured.",
  });
}
