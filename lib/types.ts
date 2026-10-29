export type AgentId = "commander" | "oracle" | "pixel" | "forge" | "sentinel" | "critic";
export type AgentStatus = "idle" | "thinking" | "working" | "reviewing" | "waiting" | "done" | "error";
export type TaskStatus = "queued" | "running" | "review" | "done" | "blocked";

export interface AgentDefinition {
  id: AgentId; name: string; title: string; short: string; color: string; accent: string;
  role: string; capabilities: string[]; station: [number, number, number];
}
export interface MissionTask {
  id: string; title: string; detail: string; agentId: AgentId; status: TaskStatus;
  duration: string; dependencies: string[];
}
export interface ActivityEvent {
  id: string; time: string; agentId: AgentId | "system"; message: string;
  tone: "info" | "success" | "warning" | "error";
}
export interface Artifact {
  id: string; name: string; kind: string; detail: string; status: "ready" | "review" | "draft";
}
