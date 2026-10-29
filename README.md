# AGENTVERSE

**Your vision. Your AI company. Your universe.**

AGENTVERSE is a futuristic, interactive 3D software studio where six specialized AI-agent roles coordinate work on software missions.

The repository currently provides a **runnable front-end prototype**: an explorable 3D-inspired office, selectable agent stations, mission creation, a task pipeline, activity stream, approval gate, and an artifact summary export.

> **Important — demo mode:** this release does not yet call an AI model, execute generated code, or deploy applications. Mission steps, agent status changes, and review messages are simulated in the browser. This is intentionally labeled in the UI. No API key is needed for the prototype.

## Prototype features

- Interactive 3D office built with React Three Fiber, Three.js, and Drei
- Six role profiles: NOVA (Commander), ORACLE (Researcher), PIXEL (Designer), FORGE (Developer), SENTINEL (QA), and CRITIC (Reviewer)
- Mission prompt with software-project quick starts
- Sample task pipeline, progress indicator, event feed, and agent inspector
- Pause/resume demo workflow and founder review gate
- Downloadable Markdown summary of the demo workflow
- Responsive dark sci-fi UI and `/api/health` endpoint

## Run locally

Requirements: Node.js **20.9 or newer** and npm.

```bash
git clone https://github.com/Vaishnavi28377/agentverse.git
cd agentverse
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, replace the copy command with:

```powershell
Copy-Item .env.example .env.local
```

## Scripts

```bash
npm run dev       # start development server
npm run lint      # run ESLint
npm run typecheck # run TypeScript checks
npm run build     # create production build
npm start         # serve production build
```

Health endpoint: [http://localhost:3000/api/health](http://localhost:3000/api/health).

## Repository layout

```
app/
  api/health/route.ts  # prototype health endpoint
  globals.css          # design system and responsive UI
  layout.tsx
  page.tsx
components/
  agentverse-app.tsx   # mission control and prototype interactions
  office-scene.tsx     # interactive 3D office
lib/
  agents.ts            # agent definitions and mission planner
  types.ts             # shared TypeScript types
```

## Next: connect real agent execution

The front end is not an autonomous software-building engine yet. To enable real execution, add a secure backend:

1. An authenticated API and durable orchestrator for missions, tasks, and state transitions.
2. A database for projects, tasks, artifacts, approval requests, and audit history.
3. Role-specific model calls with structured outputs and tool permissions.
4. An isolated, resource-limited workspace for file edits, commands, builds, and tests.
5. Git checkpoints and inspectable diffs.
6. A persisted SSE/WebSocket event stream so the 3D office reflects actual backend activity.
7. Server-side approvals for consequential actions such as public deployment, external messages, paid services, and destructive operations.

Do not put provider secrets in `NEXT_PUBLIC_*` variables or execute generated code in the Next.js web server. Before enabling real tools, implement authentication, authorization, allowlisted tool calls, resource limits, restricted networking, durable jobs, cancellation, audit logs, and sandbox isolation. Treat repository files, web content, and model output as untrusted input.

## Known limitations

- No authentication or database; mission state is browser-only and resets on refresh.
- Agent events and task results are simulated and do not demonstrate model execution.
- No real code generation, terminal execution, test runner, or deployment is connected.
- The 3D characters are procedural placeholder geometry, not finished animated GLB avatars.
- Google Fonts and some Drei environment assets may require internet access.
- The project is a prototype, not production-ready software.

## Roadmap

- [ ] Add authentication and persisted projects
- [ ] Build a durable backend orchestrator and worker queue
- [ ] Add a server-side model provider adapter
- [ ] Add isolated workspaces, file editing, and Git checkpoints
- [ ] Connect real builds, tests, and browser previews
- [ ] Persist approval gates and audit records
- [ ] Add end-to-end tests and deployment documentation

## License

No license has been selected yet. Add a license before inviting external contributions or redistributing the project.
