import { z } from "zod";
import type { EulerTask, ToolContext } from "@/lib/euler/types";
import { registerTool } from "@/lib/tools/registry";

// In-memory storage is only for local scaffold testing; it resets when the server restarts.
// Replace this with a user-scoped Supabase service before relying on persistence.
const tasks = new Map<string, EulerTask[]>();

const CreateTaskInput = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(1000).optional()
});

const ListTaskInput = z.object({});

function getUserTasks(userId: string | null): EulerTask[] {
  const key = userId ?? "local-development-user";
  const existing = tasks.get(key) ?? [];
  tasks.set(key, existing);
  return existing;
}

registerTool({
  name: "create_task",
  description: "Create a task in local in-memory development storage.",
  permission: "reversible_write",
  async execute(input: unknown, context: ToolContext) {
    const parsed = CreateTaskInput.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid task input." };
    const task: EulerTask = {
      id: crypto.randomUUID(),
      title: parsed.data.title,
      description: parsed.data.description,
      status: "queued",
      createdAt: new Date().toISOString()
    };
    getUserTasks(context.userId).push(task);
    return { ok: true, data: task };
  }
});

registerTool({
  name: "list_tasks",
  description: "List tasks from local in-memory development storage.",
  permission: "read_only",
  async execute(input: unknown, context: ToolContext) {
    const parsed = ListTaskInput.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid list task input." };
    return { ok: true, data: getUserTasks(context.userId) };
  }
});
