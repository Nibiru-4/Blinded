export type Side = "blue" | "red"
export type ActionType = "ban" | "pick"

export type DraftStep = {
  side: Side
  action: ActionType
  // Position within that side's ban/pick list (0-indexed), e.g. blue's 2nd pick.
  slot: number
}

/**
 * Competitive-style draft order, per spec:
 * Ban 1: B,R,B,R,B,R (3 each)
 * Pick 1: B,R,R,B,B (blue picks #1/4/5, red picks #2/3)
 * Ban 2: R,B,R,B (2 each, red starts)
 * Pick 2: R,R,B,B,R (red finishes with 2+1, blue with 2)
 */
export const DRAFT_SEQUENCE: DraftStep[] = [
  { side: "blue", action: "ban", slot: 0 },
  { side: "red", action: "ban", slot: 0 },
  { side: "blue", action: "ban", slot: 1 },
  { side: "red", action: "ban", slot: 1 },
  { side: "blue", action: "ban", slot: 2 },
  { side: "red", action: "ban", slot: 2 },

  { side: "blue", action: "pick", slot: 0 },
  { side: "red", action: "pick", slot: 0 },
  { side: "red", action: "pick", slot: 1 },
  { side: "blue", action: "pick", slot: 1 },
  { side: "blue", action: "pick", slot: 2 },

  { side: "red", action: "ban", slot: 3 },
  { side: "blue", action: "ban", slot: 3 },
  { side: "red", action: "ban", slot: 4 },
  { side: "blue", action: "ban", slot: 4 },

  { side: "red", action: "pick", slot: 2 },
  { side: "red", action: "pick", slot: 3 },
  { side: "blue", action: "pick", slot: 3 },
  { side: "blue", action: "pick", slot: 4 },
  { side: "red", action: "pick", slot: 4 },
]

export const TOTAL_STEPS = DRAFT_SEQUENCE.length

export function stepLabel(step: DraftStep): string {
  const sideLabel = step.side === "blue" ? "Blue Side" : "Red Side"
  const actionLabel = step.action === "ban" ? "Ban" : "Pick"
  return `${sideLabel} — ${actionLabel} ${step.slot + 1}`
}
