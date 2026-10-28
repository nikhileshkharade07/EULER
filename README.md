# EULER

**EULER** is a personal AI command center designed to converse, remember user-approved information, plan multi-step tasks, coordinate specialist agents, and execute approved actions through controlled tools.

This repository is the **starter foundation** for the EULER project. It is intentionally structured so the UI, backend, orchestration, memory, permissions, and local executor can evolve independently. It does not pretend that unconfigured integrations are already working.

## Initial scope

- Futuristic, responsive dashboard with chat and clear assistant states
- Server-side OpenAI Responses API integration
- Basic typed tool registry with task creation and task listing
- Supabase/PostgreSQL schema for conversations, tasks, and user-approved memories
- Planner and initial Research/Productivity specialist-agent definitions
- Approval service primitives and activity logging types
- Local executor placeholder that stays disabled until explicitly configured
- `.env.example`, setup instructions, and a small test suite

## Architecture

```text
EULER UI (Next.js + TypeScript + Tailwind)
              |
              v
       Server API routes
              |
              v
     EULER orchestration
       /      |       \
    Planner  Agents  Tool registry
              |          |
        Memory service   Permission checks
              |          |
        Supabase DB   Approval gate
                         |
                 Local executor (disabled by default)
```

## Requirements

- Node.js 20.9+ (recommended)
- npm
- An OpenAI API key for live AI responses
- A Supabase project for persistent storage (optional for initial local UI; required for database persistence)

## Run locally

1. Copy this repository into your GitHub repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env.local
   ```

4. Add `OPENAI_API_KEY` to `.env.local` if you want live AI responses. Keep it server-side; never prefix it with `NEXT_PUBLIC_`.
5. Add Supabase project values if you want persistence.
6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | For live AI | Server-side OpenAI API access |
| `OPENAI_MODEL` | No | Model name; defaults to `gpt-4.1-mini` |
| `NEXT_PUBLIC_SUPABASE_URL` | For Supabase | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For Supabase client | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only, optional | Trusted server-side operations; never expose to browser |
| `EULER_LOCAL_EXECUTOR_ENABLED` | No; defaults off | Must be `true` before any local executor integration is considered |
| `EULER_ALLOWED_ORIGINS` | No | Comma-separated allowlist for a future local executor |

## What's implemented vs. what's next

### Implemented in this starter

- Dashboard shell and chat interaction
- Server route for AI responses when `OPENAI_API_KEY` is configured
- A small in-memory task tool registry for local development
- Structured planner/agent definitions and permission categories
- Supabase SQL schema and Row Level Security policies
- Honest fallback message if the API key is missing
- Local executor remains unavailable by default

### Not yet production-ready

- Authentication flow and full per-user session enforcement
- Persistent chat/task/memory services wired to Supabase
- Voice / Realtime API
- Browser automation
- Local desktop executor
- Production-grade approvals and audit storage
- Multi-agent delegation with verified real-world actions

The interface must not claim an action succeeded unless the relevant service returns a successful result. Never simulate computer control when the local executor is not configured.

## Safety principles

- No unrestricted shell access for the model.
- No model-generated code or commands are executed directly.
- Desktop actions must go through a separately running local executor, an explicit allowlist, validation, and approval.
- Confirm before deleting, uploading, sending, publishing, or modifying important data.
- Keep API keys on the server.
- Store only user-approved memories; never store passwords or secrets in AI memory.
- Make tool results, errors, and task status visible.

## Project structure

```text
EULER/
├── app/
│   ├── api/chat/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat-panel.tsx
│   ├── sidebar.tsx
│   └── status-pill.tsx
├── lib/
│   ├── agents/
│   │   └── definitions.ts
│   ├── euler/
│   │   ├── orchestrator.ts
│   │   ├── planner.ts
│   │   └── types.ts
│   ├── permissions/
│   │   └── policy.ts
│   ├── tools/
│   │   ├── registry.ts
│   │   └── task-tools.ts
│   └── supabase/
│       └── client.ts
├── supabase/schema.sql
├── tests/
│   └── policy.test.ts
├── .env.example
└── README.md
```

## Recommended build order

1. Complete one end-to-end text conversation.
2. Add authentication and persistent conversations.
3. Wire tasks and user-controlled memory to Supabase.
4. Add planner task tracking, specialist agents, cancellation, and real activity logs.
5. Add approval UI and durable audit logs.
6. Add voice with clear microphone state.
7. Build the local executor separately and add allowlisted Playwright workflows.
