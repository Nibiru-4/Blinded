export type Champion = {
  id: string
  name: string
  title: string
  tags: string[]
  blurb: string
}

const FALLBACK_VERSION = "14.1.1"

export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    const versions: string[] = await res.json()
    return versions[0] ?? FALLBACK_VERSION
  } catch {
    return FALLBACK_VERSION
  }
}

export async function getChampions(version: string): Promise<Champion[]> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  )
  const data = await res.json()
  const champions: Champion[] = Object.values(data.data).map((c: any) => ({
    id: c.id,
    name: c.name,
    title: c.title,
    tags: c.tags,
    blurb: c.blurb,
  }))
  return champions.sort((a, b) => a.name.localeCompare(b.name))
}

export function championSquareUrl(version: string, championId: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`
}

export function championSplashUrl(championId: string, skin = 0): string {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skin}.jpg`
}

export const ROLE_LABELS: Record<string, string> = {
  Fighter: "Combattant",
  Assassin: "Assassin",
  Mage: "Mage",
  Support: "Support",
  Marksman: "Tireur",
  Tank: "Tank",
}
