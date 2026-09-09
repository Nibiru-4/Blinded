import React from "react"
import Image from "next/image"
import { championSquareUrl } from "@/lib/ddragon"

interface IChampionIcon {
  id: string
  name?: string
  version: string
  unavailable?: boolean
  onClick?: () => void
  size?: number
}

export const ChampionIcon = ({
  id,
  name,
  version,
  unavailable = false,
  onClick,
  size = 64,
}: IChampionIcon) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={unavailable}
      title={name ?? id}
      className={`group relative overflow-hidden rounded border transition-all ${
        unavailable
          ? "cursor-not-allowed border-lol-red/30 grayscale"
          : "border-lol-gold/30 hover:scale-105 hover:border-lol-goldlight"
      }`}
      style={{ width: size, height: size }}
    >
      <Image
        src={championSquareUrl(version, id)}
        alt={name ?? id}
        width={size}
        height={size}
        className={unavailable ? "opacity-30" : "opacity-100"}
      />
      {unavailable && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-lol-red">
          ✕
        </span>
      )}
    </button>
  )
}
