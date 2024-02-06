import React, {useState} from "react"
import {Menu} from "@/components/constants/Menu";
import {Input} from "@/components/ui/input";
import {ChampionIcon} from "@/components/constants/champion-icon"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";


export type Champion = {
    blurb: string
    id: string
    image: { full: string, sprite: string, group: string, h: number, w: number, x: number, y: number }
    tags: string[]
    isActif: boolean
}

interface indexProps {
    champions: Champion[]
}

export const getServerSideProps = async (context: any) => {

    const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json`
    );
    const array = []
    const data = await response.json()
    const champions = await data.data
    for (const champ in champions) {
        array.push({
            ...champions[champ],
            isActif: true
        })
    }


    return {
        props: {
            champions: array
        }
    }
}
const Index = (props: indexProps) => {

    const router = useRouter()

    const [typeHandler, setTypeHandler] = useState("")
    const [champName, setChampName] = useState("")

    const [bluePicks, setBluePicks] = useState<Champion[]>([])
    const [redPicks, setRedPicks] = useState<Champion[]>([])

    const filter = (type: string) => {
        if (typeHandler == type) {
            setTypeHandler("")
            return
        }
        setTypeHandler(type)
    }

    const clickIconHandler = (champion: Champion) => {

        if (bluePicks.length === 5 && redPicks.length < 5) {
            setRedPicks([
                ...redPicks,
                champion
            ])
            champion.isActif = false
        }
        if (bluePicks.length < 5) {
            setBluePicks([
                ...bluePicks,
                champion
            ])
            champion.isActif = false

        }


    }

    const pressValidateHandler = () => {
        router.push({
            pathname : "/simulation/validation",
            query : {
                one : JSON.stringify(bluePicks),
                two :  JSON.stringify(redPicks)
            }
        },"/simulation/validation")
    }


    return (
        <div className={""}>
            <Menu/>
            <div className={""}>
                <div className={"p-4 flex flex-col justify-center items-center"}>
                    <p className={"font-bold font-mono m-4"}>Version 13.19.1</p>
                    {bluePicks.length === 5 && redPicks.length === 5 ?
                        <Button className={"font-mono"} disabled={false} onClick={pressValidateHandler}>Valider</Button> :
                        <Button className={"font-mono"} disabled={true} onClick={pressValidateHandler}>Valider</Button>}

                </div>
                <div className={" flex w-screen justify-between"}>
                    <div className={" w-1/4 flex flex-col items-center"}>
                        <p className={"font-mono font-bold m-4 text-blue-900"}>Blue Side</p>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            bluePicks.shift()
                            setBluePicks([
                                ...bluePicks
                            ])
                        }}>
                            {bluePicks[0] ?
                                <ChampionIcon id={bluePicks[0].id} isActif={true} tags={bluePicks[0].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            bluePicks.splice(1, 1)
                            setBluePicks([
                                ...bluePicks
                            ])
                        }}>
                            {bluePicks[1] ?
                                <ChampionIcon id={bluePicks[1].id} isActif={true} tags={bluePicks[1].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            bluePicks.splice(2, 1)
                            setBluePicks([
                                ...bluePicks
                            ])
                        }}>
                            {bluePicks[2] ?
                                <ChampionIcon id={bluePicks[2].id} isActif={true} tags={bluePicks[2].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            bluePicks.splice(3, 1)
                            setBluePicks([
                                ...bluePicks
                            ])
                        }}>
                            {bluePicks[3] ?
                                <ChampionIcon id={bluePicks[3].id} isActif={true} tags={bluePicks[3].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            bluePicks.pop()
                            setBluePicks([
                                ...bluePicks
                            ])
                        }}>
                            {bluePicks[4] ?
                                <ChampionIcon id={bluePicks[4].id} isActif={true} tags={bluePicks[4].tags}/> : ""}
                        </div>
                    </div>
                    <div className={"w-1/2"}>
                        <div className={"p-2"}>
                            <Input className={"font-mono"} placeholder={"champion name"} value={champName} onChange={(e) => {
                                setChampName(e.target.value)
                                console.log(champName)
                            }}/>
                        </div>
                        <div className={" flex items-center justify-center "}>
                            <p onClick={() => filter("Fighter")}
                               className={`p-1 m-2 bg-gray-300 rounded cursor-pointer font-mono 
                               ${typeHandler == "Fighter" ? "text-green-700" : ""}`}>Combattant</p>
                            <p onClick={() => filter("Assassin")}
                               className={`p-1 m-2 bg-gray-300 rounded cursor-pointer font-mono 
                               ${typeHandler == "Assassin" ? "text-green-700" : ""}`}>Assassin</p>
                            <p onClick={() => filter("Mage")}
                               className={`p-1 m-2 bg-gray-300 rounded cursor-pointer font-mono 
                               ${typeHandler == "Mage" ? "text-green-700" : ""}`}>Mage</p>
                            <p onClick={() => filter("Support")}
                               className={`p-1 m-2 bg-gray-300 rounded cursor-pointer font-mono 
                               ${typeHandler == "Support" ? "text-green-700" : ""}`}>Support</p>
                            <p onClick={() => filter("Marksman")}
                               className={`p-1 m-2 bg-gray-300 rounded cursor-pointer font-mono 
                               ${typeHandler == "Marksman" ? "text-green-700" : ""}`}>Tireur1</p>
                            <p onClick={() => filter("Tank")}
                               className={`p-1 m-2 bg-gray-300 rounded cursor-pointer font-mono 
                               ${typeHandler == "Tank" ? "text-green-700" : ""}`}>Tank</p>
                        </div>
                        <div className={"grid grid-cols-6 h-screen overflow-auto grid-flow-row  "}>
                            {props.champions.map((champion: Champion) => {
                                if (typeHandler.length > 0 && champion.tags.includes(typeHandler)) {
                                    if (champion.id.toUpperCase().startsWith(champName) || champion.id.toLowerCase().startsWith(champName)) {

                                        if (champion.isActif) {
                                            return (<div key={champion.id} onClick={() => clickIconHandler(champion)}>
                                                <ChampionIcon id={champion.id} tags={champion.tags}
                                                              isActif={champion.isActif}/>
                                            </div>)
                                        }
                                    }
                                }
                                if (typeHandler == "" && (champion.id.toUpperCase().startsWith(champName)
                                    || champion.id.toLowerCase().startsWith(champName))) {

                                    if (champion.isActif) {
                                        return (<div key={champion.id} onClick={() => clickIconHandler(champion)}>
                                            <ChampionIcon id={champion.id} tags={champion.tags}
                                                          isActif={champion.isActif}/>
                                        </div>)
                                    }

                                }
                            })}
                        </div>


                    </div>
                    <div className={" w-1/4 flex flex-col items-center"}>
                        <p className={"font-mono font-bold m-4 text-red-900"}>Red Side</p>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            redPicks.shift()
                            setRedPicks([
                                ...redPicks
                            ])
                        }}>
                            {redPicks[0] ?
                                <ChampionIcon id={redPicks[0].id} isActif={true} tags={redPicks[0].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            redPicks.splice(1, 1)
                            setRedPicks([
                                ...redPicks
                            ])
                        }}>
                            {redPicks[1] ?
                                <ChampionIcon id={redPicks[1].id} isActif={true} tags={redPicks[1].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            redPicks.splice(2, 1)
                            setRedPicks([
                                ...redPicks
                            ])
                        }}>
                            {redPicks[2] ?
                                <ChampionIcon id={redPicks[2].id} isActif={true} tags={redPicks[2].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            redPicks.splice(3, 1)
                            setRedPicks([
                                ...redPicks
                            ])
                        }}>
                            {redPicks[3] ?
                                <ChampionIcon id={redPicks[3].id} isActif={true} tags={redPicks[3].tags}/> : ""}
                        </div>
                        <div className={"bg-gray-300 h-24 w-24 m-4"} onClick={() => {
                            redPicks.pop()
                            setRedPicks([
                                ...redPicks
                            ])
                        }}>
                            {redPicks[4] ?
                                <ChampionIcon id={redPicks[4].id} isActif={true} tags={redPicks[4].tags}/> : ""}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Index