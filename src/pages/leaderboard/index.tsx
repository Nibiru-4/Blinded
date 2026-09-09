import React from "react"
import { Menu } from "@/components/constants/Menu"
import { columns, Player } from "@/components/constants/table/table-columns"
import { DataTable } from "@/components/constants/table/data-table"
import { useRouter } from "next/router"

const players: Player[] = [
  { id: 0, gamerTag: "Faker Wannabe", elo: 1842 },
  { id: 1, gamerTag: "Zed Or Fed", elo: 1710 },
  { id: 2, gamerTag: "JungleDiff", elo: 1603 },
  { id: 3, gamerTag: "Alson", elo: 1240 },
  { id: 4, gamerTag: "Blson", elo: 1180 },
  { id: 5, gamerTag: "SupportMain69", elo: 1102 },
  { id: 6, gamerTag: "Clson", elo: 980 },
  { id: 7, gamerTag: "Dlson", elo: 940 },
  { id: 8, gamerTag: "IntFeeder", elo: 812 },
]

const Index = () => {
  const router = useRouter()
  const sorted = [...players].sort((a, b) => b.elo - a.elo)

  return (
    <>
      <Menu />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p
          className="mb-2 cursor-pointer text-sm text-lol-cream/50 hover:text-lol-goldlight"
          onClick={() => router.push("/")}
        >
          Accueil /
        </p>
        <h1 className="hextech-heading mb-1 text-2xl">Leaderboard</h1>
        <p className="mb-8 text-sm text-lol-cream/50">
          Données de démonstration — pas encore connecté à un vrai suivi de
          parties.
        </p>
        <div className="hextech-panel overflow-hidden p-2">
          <DataTable columns={columns} data={sorted} />
        </div>
      </div>
    </>
  )
}

export default Index
