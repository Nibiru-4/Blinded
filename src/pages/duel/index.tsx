import React from "react"
import { Menu } from "@/components/constants/Menu"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function PocNotice() {
  return (
    <AlertDialogContent className="border-lol-gold/40 bg-lol-navy">
      <AlertDialogHeader>
        <AlertDialogTitle className="hextech-heading text-lg">
          Attention !
        </AlertDialogTitle>
        <AlertDialogDescription className="text-lol-cream/60">
          Ce site est une &quot;proof of concept&quot; et n&apos;est pas
          fonctionnel.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="border-lol-gold/40 bg-transparent text-lol-cream hover:bg-lol-gold/10">
          Dommage...
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

const Index = () => {
  return (
    <>
      <Menu />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="hextech-heading mb-1 text-2xl">Duel</h1>
        <p className="mb-8 text-sm text-lol-cream/50">
          Affronte un autre joueur en 1v1 draft — démo.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <AlertDialog>
            <AlertDialogTrigger className="hextech-panel flex flex-col items-center gap-3 p-8 transition-transform hover:-translate-y-1">
              <Image
                src={require("../../../public/chibiLux.png")}
                alt="chibi"
                width={200}
                height={200}
              />
              <span className="hextech-heading text-sm">Partie normale</span>
            </AlertDialogTrigger>
            <PocNotice />
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger className="hextech-panel flex flex-col items-center gap-3 p-8 transition-transform hover:-translate-y-1">
              <Image
                src={require("../../../public/chibiLee.png")}
                alt="chibi"
                width={200}
                height={200}
              />
              <span className="hextech-heading text-sm">Partie classée</span>
            </AlertDialogTrigger>
            <PocNotice />
          </AlertDialog>
        </div>

        <div className="mx-auto mt-12 flex max-w-sm flex-col items-center gap-4">
          <Input
            className="border-lol-gold/30 bg-lol-navy text-center text-lol-cream"
            placeholder="Code de la partie"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full bg-lol-gold text-lol-void hover:bg-lol-goldlight">
                Rejoindre quelqu&apos;un
              </Button>
            </AlertDialogTrigger>
            <PocNotice />
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger className="text-sm text-lol-cream/60 underline underline-offset-4 hover:text-lol-goldlight">
              ou créer une partie
            </AlertDialogTrigger>
            <PocNotice />
          </AlertDialog>
        </div>
      </div>
    </>
  )
}

export default Index
