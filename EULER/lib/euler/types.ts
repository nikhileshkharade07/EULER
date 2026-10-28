export type TaskStatus = "queued" | "running" | "awaiting_approval" | "completed" | "failed" | "cancelled";
export type PermissionLevel = "read_only" | "reversible_write" | "sensitive_action";

export interface EulerTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}

export interface PlanStep {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  requiresApproval: boolean;
}

export interface ToolResult<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface ToolContext {
  userId: string | null;
  approvedActionIds: string[];
}
