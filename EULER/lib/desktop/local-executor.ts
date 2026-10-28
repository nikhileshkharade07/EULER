/**
 * Safe placeholder only. Do not add arbitrary shell execution here.
 * A real executor should run as a separate local process, enforce an allowlist,
 * validate every operation, preview changes, and require approval for sensitive actions.
 */
export interface ExecutorStatus {
  enabled: boolean;
  message: string;
}

export function getLocalExecutorStatus(): ExecutorStatus {
  const enabled = process.env.EULER_LOCAL_EXECUTOR_ENABLED === "true";
  return enabled
    ? { enabled: true, message: "Executor flag is enabled, but no operations are implemented in this scaffold." }
    : { enabled: false, message: "Local executor is disabled. Desktop control is unavailable." };
}
