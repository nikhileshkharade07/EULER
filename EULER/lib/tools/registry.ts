import type { ToolContext, ToolResult } from "@/lib/euler/types";

export interface EulerTool<TInput = unknown, TOutput = unknown> {
  name: string;
  description: string;
  permission: "read_only" | "reversible_write" | "sensitive_action";
  execute(input: TInput, context: ToolContext): Promise<ToolResult<TOutput>>;
}

const registry = new Map<string, EulerTool<never, unknown>>();

export function registerTool<TInput, TOutput>(tool: EulerTool<TInput, TOutput>): void {
  if (registry.has(tool.name)) throw new Error(`EULER tool already registered: ${tool.name}`);
  registry.set(tool.name, tool as EulerTool<never, unknown>);
}

export function getTool(name: string): EulerTool<never, unknown> | undefined {
  return registry.get(name);
}

export function listTools(): Array<Pick<EulerTool, "name" | "description" | "permission">> {
  return [...registry.values()].map(({ name, description, permission }) => ({ name, description, permission }));
}

export async function invokeTool(name: string, input: unknown, context: ToolContext): Promise<ToolResult> {
  const tool = getTool(name);
  if (!tool) return { ok: false, error: `Tool "${name}" is not registered.` };
  try {
    return await tool.execute(input as never, context);
  } catch {
    return { ok: false, error: `Tool "${name}" failed. Check server logs.` };
  }
}
