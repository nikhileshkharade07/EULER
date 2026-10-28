# EULER architecture notes

## Design boundaries

- **UI:** presents conversations, tasks, statuses, approvals, and activity.
- **API/backend:** validates requests and owns server credentials.
- **Orchestration:** plans work and selects registered tools.
- **Agents:** specialist role definitions with restricted tool lists.
- **Tool registry:** only known tools may run; each tool validates input.
- **Memory:** user-approved preferences and project context, scoped to the user.
- **Permissions:** classifies read-only, reversible writes, and sensitive actions.
- **Local executor:** separate process; disabled until explicitly configured.
- **Verification:** a task is complete only after the underlying result is confirmed.

## Current scaffold limitations

The current chat endpoint calls the configured model for text responses only. It does not yet execute model-requested tools or coordinate specialist agents. Task tools currently use in-memory storage for development and reset on server restart. Supabase schema is provided but is not yet wired into the task and memory services. The local executor is a disabled placeholder.
