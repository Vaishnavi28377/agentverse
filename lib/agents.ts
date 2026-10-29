import type { ActivityEvent, AgentDefinition, AgentId, MissionTask } from "./types";

export const AGENTS: AgentDefinition[] = [
  { id: "commander", name: "NOVA", title: "Commander", short: "Mission orchestration", color: "#70e7ff", accent: "#123c50", role: "Turns a high-level goal into a dependency-aware plan and coordinates the team.", capabilities: ["Planning", "Task routing", "Progress tracking", "Escalation"], station: [0, 0, 0] },
  { id: "oracle", name: "ORACLE", title: "Researcher", short: "Evidence & discovery", color: "#b4a1ff", accent: "#302456", role: "Researches requirements and produces source-backed technical notes.", capabilities: ["Requirements", "Documentation", "Source checks", "Technical research"], station: [-4.5, 0, -3] },
  { id: "pixel", name: "PIXEL", title: "UI/UX Designer", short: "Design systems", color: "#ff8ed4", accent: "#51284a", role: "Defines interaction patterns, layouts, typography, and responsive design tokens.", capabilities: ["Visual direction", "Design tokens", "Accessibility", "Responsive UI"], station: [4.5, 0, -3] },
  { id: "forge", name: "FORGE", title: "Developer", short: "Implementation", color: "#73f5c0", accent: "#174d42", role: "Implements features in a controlled project workspace and records inspectable diffs.", capabilities: ["Code changes", "Dependencies", "Build fixes", "Git checkpoints"], station: [-4.5, 0, 3] },
  { id: "sentinel", name: "SENTINEL", title: "QA Engineer", short: "Testing & validation", color: "#ffd479", accent: "#56411c", role: "Runs verification and reports reproducible failures with evidence.", capabilities: ["Unit tests", "Type checks", "Browser tests", "Regression checks"], station: [4.5, 0, 3] },
  { id: "critic", name: "CRITIC", title: "Independent Reviewer", short: "Quality gate", color: "#ff858f", accent: "#552630", role: "Challenges assumptions and reviews acceptance criteria, security, and evidence.", capabilities: ["Code review", "Security review", "Acceptance checks", "Revision requests"], station: [0, 0, 5.4] },
];
export const AGENT_BY_ID = Object.fromEntries(AGENTS.map((agent) => [agent.id, agent])) as Record<AgentId, AgentDefinition>;
export function makeTasks(prompt: string): MissionTask[] {
  const subject = prompt.trim().replace(/[.!?]+$/, "").slice(0, 64) || "the requested application";
  return [
    { id: "t-01", title: "Plan: " + subject, detail: "Break the mission into clear acceptance criteria and dependent work.", agentId: "commander", status: "queued", duration: "planning", dependencies: [] },
    { id: "t-02", title: "Research and requirements", detail: "Map the requested features, constraints, and technical choices.", agentId: "oracle", status: "queued", duration: "research", dependencies: ["t-01"] },
    { id: "t-03", title: "Design the user experience", detail: "Specify page structure, responsive behavior, and component patterns.", agentId: "pixel", status: "queued", duration: "design", dependencies: ["t-02"] },
    { id: "t-04", title: "Implement core features", detail: "Create application files and connect the primary interactions.", agentId: "forge", status: "queued", duration: "build", dependencies: ["t-03"] },
    { id: "t-05", title: "Test and validate", detail: "Check routes, behavior, responsive layout, and build evidence.", agentId: "sentinel", status: "queued", duration: "verification", dependencies: ["t-04"] },
    { id: "t-06", title: "Independent quality review", detail: "Inspect acceptance criteria and record outstanding risks.", agentId: "critic", status: "queued", duration: "review", dependencies: ["t-05"] },
  ];
}
export const DEMO_EVENTS: Omit<ActivityEvent, "id" | "time">[] = [
  { agentId: "commander", message: "Mission plan drafted and task dependencies mapped.", tone: "info" },
  { agentId: "oracle", message: "Requirements pass complete — demo evidence only.", tone: "success" },
  { agentId: "pixel", message: "Responsive layout and component plan prepared.", tone: "success" },
  { agentId: "forge", message: "Demo implementation artifact assembled; no code has been executed.", tone: "warning" },
  { agentId: "sentinel", message: "Demo QA checklist completed; automated tests are not connected.", tone: "warning" },
  { agentId: "critic", message: "Review complete. Release requires founder approval.", tone: "info" },
];
