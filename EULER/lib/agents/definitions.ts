import type { PermissionLevel } from "@/lib/euler/types";

export interface AgentDefinition {
  id: "research" | "productivity";
  name: string;
  purpose: string;
  allowedTools: string[];
  permissionLevel: PermissionLevel;
}

export const AGENTS: AgentDefinition[] = [
  {
    id: "research",
    name: "Research Agent",
    purpose: "Gather information from approved sources and produce cited summaries.",
    allowedTools: ["search_web"],
    permissionLevel: "read_only"
  },
  {
    id: "productivity",
    name: "Productivity Agent",
    purpose: "Manage user-approved tasks, notes, and schedules through registered tools.",
    allowedTools: ["create_task", "list_tasks", "search_memory", "save_memory"],
    permissionLevel: "reversible_write"
  }
];
