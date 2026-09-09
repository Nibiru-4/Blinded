import React, { useMemo, useState } from "react"
import Image from "next/image"
import { DragDropContext, Draggable, Droppable, type OnDragEndResponder } from "@hello-pangea/dnd"
import { Menu } from "@/components/constants/Menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChampionIcon } from "@/components/constants/champion-icon"
import {
  getLatestVersion,
  getChampions,
  ROLE_LABELS,
  type Champion,
} from "@/lib/ddragon"
import { useDraft, type SideSlots } from "@/hooks/use-draft"
import { stepLabel, type Side } from "@/lib/draft"

const ROLES = [
  { icon: "toplane", label: "Top" },
  { icon: "jungle", label: "Jungle" },
  { icon: "mid", label: "Mid" },
  { icon: "adc", label: "ADC" },
  { icon: "support", label: "Support" },
]

interface IndexProps {
  version: string
  champions: Champion[]
}

export const getServerSideProps = async () => {
  const version = await getLatestVersion()
  const champions = await getChampions(version)

  return {
    props: { version, champions },
  }
}

function SlotRow({
  slots,
  version,
  size,
  emptyLabel,
}: {
  slots: SideSlots
  version: string
  size: number
  emptyLabel: string
}) {
  return (
    <div className="flex gap-2">
      {slots.map((championId, index) => (
        <div
          key={index}
          className="flex items-center justify-center overflow-hidden rounded border border-lol-gold/25 bg-lol-void/60"
          style={{ width: size, height: size }}
        >
          {championId ? (
            <ChampionIcon id={championId} version={version} size={size} />
          ) : (
            <span className="text-xs text-lol-cream/20">{emptyLabel}</span>
          )}
        </div>
      ))}
    </div>
  )
}

function RolesRow({
  side,
  picks,
  version,
  onDragEnd,
}: {
  side: Side
  picks: SideSlots
  version: string
  onDragEnd: OnDragEndResponder
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`${side}-picks`} direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-3"
          >
            {picks.map((championId, index) => (
              <Draggable
                key={championId ?? index}
                draggableId={championId ?? `empty-${index}`}
                index={index}
                isDragDisabled={!championId}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col items-center gap-2"
                  >
                    <Image
                      src={`/roles/${ROLES[index].icon}.png`}
                      alt={ROLES[index].label}
                      width={28}
                      height={28}
                    />
                    <div className="overflow-hidden rounded border border-lol-gold/30 bg-lol-void/60">
                      {championId && (
                        <ChampionIcon
                          id={championId}
                          version={version}
                          size={64}
                        />
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-wide text-lol-cream/40">
                      {ROLES[index].label}
                    </span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const Index = ({ version, champions }: IndexProps) => {
  const draft = useDraft()
  const [search, setSearch] = useState("")
  const [role, setRole] = useState<string>("")
  const [winner, setWinner] = useState<"blue" | "red" | null>(null)

  const visibleChampions = useMemo(() => {
    return champions.filter((champion) => {
      if (draft.unavailable.has(champion.id)) return false
      if (role && !champion.tags.includes(role)) return false
      if (
        search &&
        !champion.name.toLowerCase().startsWith(search.toLowerCase())
      )
        return false
      return true
    })
  }, [champions, draft.unavailable, role, search])

  function handleSimulate() {
    setWinner(Math.random() < 0.5 ? "blue" : "red")
  }

  function handleReset() {
    draft.reset()
    setWinner(null)
    setSearch("")
    setRole("")
  }

  function handleDragEnd(side: Side): OnDragEndResponder {
    return (result) => {
      if (!result.destination) return
      draft.reorderPicks(side, result.source.index, result.destination.index)
    }
  }

  return (
    <>
      <Menu />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="hextech-heading text-2xl">Simulation de draft</h1>
            <p className="text-sm text-lol-cream/50">Patch {version}</p>
          </div>
          {!winner && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-lol-gold/30 bg-transparent text-lol-cream hover:bg-lol-gold/10"
                disabled={!draft.canUndo}
                onClick={draft.undo}
              >
                Annuler
              </Button>
              <Button
                variant="outline"
                className="border-lol-gold/30 bg-transparent text-lol-cream hover:bg-lol-gold/10"
                onClick={handleReset}
              >
                Recommencer
              </Button>
            </div>
          )}
        </div>

        {winner ? (
          <div className="hextech-panel flex flex-col items-center gap-6 p-10 text-center">
            <p className="hextech-heading text-sm">Résultat de la simulation</p>
            <h2
              className={`text-4xl font-black ${
                winner === "blue" ? "text-sky-400" : "text-lol-red"
              }`}
            >
              {winner === "blue" ? "BLUE SIDE WINS" : "RED SIDE WINS"}
            </h2>

            <div className="mt-4 grid w-full gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold text-sky-400">
                  Blue Side
                </p>
                <div className="flex justify-center gap-2 sm:justify-start">
                  <SlotRow
                    slots={draft.picks.blue}
                    version={version}
                    size={56}
                    emptyLabel=""
                  />
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-lol-red">
                  Red Side
                </p>
                <div className="flex justify-center gap-2 sm:justify-start">
                  <SlotRow
                    slots={draft.picks.red}
                    version={version}
                    size={56}
                    emptyLabel=""
                  />
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-4 bg-lol-gold text-lol-void hover:bg-lol-goldlight"
              onClick={handleReset}
            >
              Nouvelle draft
            </Button>
          </div>
        ) : draft.isComplete ? (
          <div className="hextech-panel flex flex-col items-center gap-8 p-8">
            <div className="text-center">
              <p className="hextech-heading text-sm">
                Attribution des rôles
              </p>
              <p className="mt-1 text-sm text-lol-cream/50">
                Glisse chaque champion vers son rôle avant de lancer la
                simulation.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-sky-400">
                Blue Side
              </p>
              <RolesRow
                side="blue"
                picks={draft.picks.blue}
                version={version}
                onDragEnd={handleDragEnd("blue")}
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-lol-red">
                Red Side
              </p>
              <RolesRow
                side="red"
                picks={draft.picks.red}
                version={version}
                onDragEnd={handleDragEnd("red")}
              />
            </div>

            <Button
              size="lg"
              className="bg-lol-gold text-lol-void hover:bg-lol-goldlight"
              onClick={handleSimulate}
            >
              Simuler la draft
            </Button>
          </div>
        ) : (
          <>
            <div className="hextech-panel mb-6 flex flex-col items-center gap-2 p-4 text-center">
              <p className="text-xs uppercase tracking-widest text-lol-cream/40">
                Étape {draft.stepIndex + 1} / {draft.totalSteps}
              </p>
              <p
                className={`hextech-heading text-xl ${
                  draft.currentStep?.side === "blue"
                    ? "text-sky-400"
                    : "text-lol-red"
                }`}
              >
                {draft.currentStep ? stepLabel(draft.currentStep) : ""}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[220px_1fr_220px]">
              <div className="flex flex-col items-center gap-4 lg:items-start">
                <p className="hextech-heading text-sm text-sky-400">
                  Blue Side
                </p>
                <div>
                  <p className="mb-1 text-xs text-lol-cream/40">Bans</p>
                  <SlotRow
                    slots={draft.bans.blue}
                    version={version}
                    size={40}
                    emptyLabel=""
                  />
                </div>
                <div>
                  <p className="mb-1 text-xs text-lol-cream/40">Picks</p>
                  <div className="flex flex-col gap-2">
                    {draft.picks.blue.map((championId, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center overflow-hidden rounded border border-lol-gold/25 bg-lol-void/60"
                        style={{ width: 64, height: 64 }}
                      >
                        {championId && (
                          <ChampionIcon
                            id={championId}
                            version={version}
                            size={64}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4 flex flex-col gap-3">
                  <Input
                    className="border-lol-gold/30 bg-lol-navy text-lol-cream"
                    placeholder="Rechercher un champion..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="flex flex-wrap justify-center gap-2">
                    {Object.entries(ROLE_LABELS).map(([tag, label]) => (
                      <button
                        key={tag}
                        onClick={() => setRole(role === tag ? "" : tag)}
                        className={`rounded border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                          role === tag
                            ? "border-lol-goldlight bg-lol-gold/20 text-lol-goldlight"
                            : "border-lol-gold/20 text-lol-cream/50 hover:text-lol-goldlight"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid max-h-[520px] grid-cols-5 gap-2 overflow-y-auto rounded border border-lol-gold/15 bg-lol-void/40 p-3 sm:grid-cols-7">
                  {visibleChampions.map((champion) => (
                    <ChampionIcon
                      key={champion.id}
                      id={champion.id}
                      name={champion.name}
                      version={version}
                      size={56}
                      onClick={() =>
                        !draft.isComplete && draft.selectChampion(champion.id)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 lg:items-end">
                <p className="hextech-heading text-sm text-lol-red">
                  Red Side
                </p>
                <div>
                  <p className="mb-1 text-right text-xs text-lol-cream/40">
                    Bans
                  </p>
                  <SlotRow
                    slots={draft.bans.red}
                    version={version}
                    size={40}
                    emptyLabel=""
                  />
                </div>
                <div>
                  <p className="mb-1 text-right text-xs text-lol-cream/40">
                    Picks
                  </p>
                  <div className="flex flex-col gap-2">
                    {draft.picks.red.map((championId, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center overflow-hidden rounded border border-lol-gold/25 bg-lol-void/60"
                        style={{ width: 64, height: 64 }}
                      >
                        {championId && (
                          <ChampionIcon
                            id={championId}
                            version={version}
                            size={64}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Index
