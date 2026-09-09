import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface LinkProps {
  text: string
  variant: "bold" | "normal"
  anchor: string
  goTo: string | undefined
}

export const LinkPersonalized = (props: LinkProps) => {
  const router = useRouter()
  const isActive = props.goTo ? router.pathname.startsWith(`/${props.goTo}`) : false

  return (
    <Link href={props.goTo ? `/${props.goTo}` : "#"}>
      <p
        className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
          isActive ? "text-lol-goldlight" : "text-lol-cream/70 hover:text-lol-goldlight"
        }`}
      >
        {props.text}
      </p>
    </Link>
  )
}
