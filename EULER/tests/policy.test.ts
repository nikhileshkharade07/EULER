import { describe, expect, it } from "vitest";
import { canExecute, requiresApproval } from "../lib/permissions/policy";

describe("EULER permission policy", () => {
  it("allows read-only actions without approval", () => {
    expect(canExecute({ action: "search_notes", level: "read_only", approved: false })).toBe(true);
  });

  it("requires approval for sensitive actions", () => {
    expect(requiresApproval("send_email", "sensitive_action")).toBe(true);
    expect(canExecute({ action: "send_email", level: "sensitive_action", approved: false })).toBe(false);
  });

  it("allows a sensitive action only when explicitly approved", () => {
    expect(canExecute({ action: "delete_file", level: "sensitive_action", approved: true })).toBe(true);
  });
});
