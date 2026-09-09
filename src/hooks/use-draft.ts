import { useMemo, useReducer } from "react"
import { DRAFT_SEQUENCE, TOTAL_STEPS, type Side } from "@/lib/draft"

export type SideSlots = [
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
]

function emptySlots(): SideSlots {
  return [null, null, null, null, null]
}

type DraftState = {
  bans: Record<Side, SideSlots>
  picks: Record<Side, SideSlots>
  stepIndex: number
  history: string[]
}

function initialState(): DraftState {
  return {
    bans: { blue: emptySlots(), red: emptySlots() },
    picks: { blue: emptySlots(), red: emptySlots() },
    stepIndex: 0,
    history: [],
  }
}

type DraftAction = { type: "select"; championId: string } | { type: "undo" } | { type: "reset" }

function reducer(state: DraftState, action: DraftAction): DraftState {
  switch (action.type) {
    case "select": {
      if (state.stepIndex >= TOTAL_STEPS) return state
      const step = DRAFT_SEQUENCE[state.stepIndex]

      const allTaken = new Set<string>()
      for (const side of ["blue", "red"] as Side[]) {
        for (const id of state.bans[side]) if (id) allTaken.add(id)
        for (const id of state.picks[side]) if (id) allTaken.add(id)
      }
      if (allTaken.has(action.championId)) return state

      const key = step.action === "ban" ? "bans" : "picks"
      const nextSlots: SideSlots = [...state[key][step.side]] as SideSlots
      nextSlots[step.slot] = action.championId

      return {
        ...state,
        [key]: { ...state[key], [step.side]: nextSlots },
        history: [...state.history, action.championId],
        stepIndex: state.stepIndex + 1,
      }
    }
    case "undo": {
      if (state.stepIndex === 0) return state
      const previousStep = DRAFT_SEQUENCE[state.stepIndex - 1]
      const key = previousStep.action === "ban" ? "bans" : "picks"
      const nextSlots: SideSlots = [
        ...state[key][previousStep.side],
      ] as SideSlots
      nextSlots[previousStep.slot] = null

      return {
        ...state,
        [key]: { ...state[key], [previousStep.side]: nextSlots },
        history: state.history.slice(0, -1),
        stepIndex: state.stepIndex - 1,
      }
    }
    case "reset":
      return initialState()
  }
}

export function useDraft() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  const isComplete = state.stepIndex >= TOTAL_STEPS
  const currentStep = isComplete ? null : DRAFT_SEQUENCE[state.stepIndex]

  const unavailable = useMemo(() => {
    const set = new Set<string>()
    for (const side of ["blue", "red"] as Side[]) {
      for (const id of state.bans[side]) if (id) set.add(id)
      for (const id of state.picks[side]) if (id) set.add(id)
    }
    return set
  }, [state.bans, state.picks])

  return {
    bans: state.bans,
    picks: state.picks,
    stepIndex: state.stepIndex,
    totalSteps: TOTAL_STEPS,
    currentStep,
    isComplete,
    unavailable,
    selectChampion: (championId: string) =>
      dispatch({ type: "select", championId }),
    undo: () => dispatch({ type: "undo" }),
    canUndo: state.stepIndex > 0,
    reset: () => dispatch({ type: "reset" }),
  }
}
