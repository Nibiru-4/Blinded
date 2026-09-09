import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Button } from "../ui/button"
import { Trophy, Swords, Layers } from "lucide-react"

const FEATURES = [
  {
    title: "Leaderboard",
    description: "Le classement des invocateurs les mieux classés (démo).",
    icon: Trophy,
    goTo: "leaderboard",
  },
  {
    title: "Duel",
    description: "Défie un autre joueur en 1v1 draft (démo).",
    icon: Swords,
    goTo: "duel",
  },
  {
    title: "Simulation de draft",
    description: "Compose une draft complète, bans et picks, puis simule le résultat.",
    icon: Layers,
    goTo: "simulation",
  },
]

export const Body = () => {
  const router = useRouter()

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-20 lg:flex-row lg:justify-between">
          <div className="flex max-w-lg flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <p className="hextech-heading text-sm">Bienvenue invocateur</p>
            <h1 className="text-4xl font-black text-lol-cream sm:text-5xl">
              Blinded
            </h1>
            <p className="text-balance text-lol-cream/70">
              Entraîne-toi à la phase de sélection des champions : bannis,
              pick, et affronte l&apos;incertitude d&apos;une draft compétitive.
            </p>
            <Button
              size="lg"
              className="bg-lol-gold text-lol-void hover:bg-lol-goldlight"
              onClick={() => router.push(`/simulation`)}
            >
              Jouer
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-lol-teal/20 blur-3xl" />
            <Image
              src={require("../../../public/chibiLee.png")}
              alt="chibi"
              width={280}
              height={280}
              className="relative drop-shadow-[0_0_25px_rgba(10,200,185,0.25)]"
              priority
            />
          </div>
        </div>
        <div className="hextech-divider" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <button
              key={feature.goTo}
              onClick={() => router.push(`/${feature.goTo}`)}
              className="hextech-panel group flex flex-col items-start gap-4 p-6 text-left transition-transform hover:-translate-y-1"
            >
              <span className="rounded-md border border-lol-gold/40 bg-lol-void p-3 text-lol-goldlight">
                <feature.icon className="size-5" />
              </span>
              <span className="hextech-heading text-base">{feature.title}</span>
              <span className="text-sm text-lol-cream/60">
                {feature.description}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
