# EULER roadmap

## Milestone 1 — One reliable assistant
- [x] Dashboard shell and text conversation UI
- [x] Server-side OpenAI request route
- [x] Honest unconfigured-provider response
- [x] Basic task tool contracts and in-memory development tools
- [x] Initial permission policy and tests
- [ ] Verify install/build against current package registry
- [ ] Add streaming responses and cancellation

## Milestone 2 — Persistence and identity
- [ ] Supabase Auth sign-in/sign-out
- [ ] Persist conversations and messages per authenticated user
- [ ] Persist tasks and add task status transitions
- [ ] User-controlled memory create/search/edit/delete/pin
- [ ] Activity log stored in database
- [ ] Add integration tests for Row Level Security

## Milestone 3 — Planning and agents
- [ ] Planner creates structured steps from a goal
- [ ] Research Agent with cited sources
- [ ] Productivity Agent using only registered tools
- [ ] Track queued/running/awaiting approval/completed/failed/cancelled
- [ ] Verify tool results before marking a task complete
- [ ] Bound retries, execution time, recursion, and tool calls

## Milestone 4 — Approval and voice
- [ ] Approval preview dialog for sensitive actions
- [ ] Durable audit records for approvals and tool outcomes
- [ ] Voice through a configured voice provider
- [ ] Visible microphone state, mute/disconnect, and text fallback

## Milestone 5 — Computer control
- [ ] Separate local executor process
- [ ] Narrow operation and domain allowlists
- [ ] Playwright demo against a dedicated test page
- [ ] File access limited to user-selected directories
- [ ] Preview and confirm file changes
- [ ] No unrestricted shell access or model-generated command execution
