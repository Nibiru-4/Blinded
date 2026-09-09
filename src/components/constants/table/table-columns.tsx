import { ColumnDef } from "@tanstack/react-table"

export type Player = {
  id: number
  gamerTag: string
  elo: number
}

function eloTier(elo: number): { label: string; className: string } {
  if (elo >= 1500) return { label: "Diamant", className: "text-lol-teal" }
  if (elo >= 1100) return { label: "Or", className: "text-lol-goldlight" }
  return { label: "Argent", className: "text-lol-cream/60" }
}

export const columns: ColumnDef<Player>[] = [
  {
    id: "rank",
    header: "#",
    cell: ({ row }) => (
      <span className="font-display text-lol-goldlight">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "gamerTag",
    header: "Invocateur",
    cell: ({ row }) => (
      <span className="font-medium text-lol-cream">
        {row.original.gamerTag}
      </span>
    ),
  },
  {
    accessorKey: "elo",
    header: "Elo",
    cell: ({ row }) => {
      const tier = eloTier(row.original.elo)
      return (
        <span className="flex items-center gap-2">
          <span className={tier.className}>{row.original.elo}</span>
          <span className="text-xs uppercase tracking-wide text-lol-cream/40">
            {tier.label}
          </span>
        </span>
      )
    },
  },
]
