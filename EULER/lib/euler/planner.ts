import { z } from "zod";
import type { PlanStep } from "./types";

const PlanStepSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().max(1000),
  requiresApproval: z.boolean().default(false)
});

export const PlanSchema = z.array(PlanStepSchema).max(12);

export function createDraftPlan(items: z.infer<typeof PlanSchema>): PlanStep[] {
  return items.map((item, index) => ({
    id: `step-${index + 1}`,
    title: item.title,
    description: item.description,
    status: "queued",
    requiresApproval: item.requiresApproval
  }));
}
