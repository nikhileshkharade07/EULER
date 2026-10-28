import type { PermissionLevel } from "@/lib/euler/types";

export interface PermissionRequest {
  action: string;
  level: PermissionLevel;
  approved: boolean;
}

const SENSITIVE_ACTIONS = new Set(["delete_file", "upload_file", "send_email", "publish_content", "modify_important_data"]);

export function requiresApproval(action: string, level: PermissionLevel): boolean {
  return level === "sensitive_action" || SENSITIVE_ACTIONS.has(action);
}

export function canExecute(request: PermissionRequest): boolean {
  if (requiresApproval(request.action, request.level)) return request.approved;
  return true;
}
