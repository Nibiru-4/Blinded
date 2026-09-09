import React from "react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { LinkPersonalized } from "@/components/constants/LinkPersonalized"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

export const Menu = () => {
  const router = useRouter()

  return (
    <Sheet>
      <header className="sticky top-0 z-40 w-full border-b border-lol-gold/30 bg-lol-void/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <p
            className="hextech-heading cursor-pointer text-lg"
            onClick={() => router.push(`/`)}
          >
            Blinded
          </p>

          <nav className="hidden items-center gap-1 sm:flex">
            <LinkPersonalized text="Leaderboard" anchor="me" variant="bold" goTo="leaderboard" />
            <LinkPersonalized text="Duel" anchor="skills" variant="bold" goTo="duel" />
            <LinkPersonalized text="Simulation" anchor="projects" variant="bold" goTo="simulation" />
          </nav>

          <SheetTrigger asChild className="sm:hidden">
            <Button variant="outline" size="icon">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
        </div>
      </header>

      <SheetContent className="border-lol-gold/30 bg-lol-void">
        <div className="p-4">
          <p className="hextech-heading text-base">Menu</p>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <LinkPersonalized text="Leaderboard" anchor="me" variant="bold" goTo="leaderboard" />
          <LinkPersonalized text="Duel" anchor="skills" variant="bold" goTo="duel" />
          <LinkPersonalized text="Simulation" anchor="projects" variant="bold" goTo="simulation" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
