import React, {useEffect} from "react"
import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet";
import {LinkPersonalized} from "@/components/constants/LinkPersonalized";
import {AvatarIcon, CookieIcon, DesktopIcon, HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";


export const Menu = () => {

    const router = useRouter()




    return (
        <>
            <Sheet>
                <div className={"w-screen h-20 flex justify-between"}>
                    <div className={"w-screen flex flex-row p-8 justify-between items-center max-lg:hidden "}>
                        <p className={"italic font-bold font-mono text-lg cursor-pointer"}
                           onClick={() => router.push(`/`)}>Blinded</p>
                        <div className={"flex flex-row  items-center justify-center"}>
                            <LinkPersonalized text={"Leaderboard"} anchor={"me"} variant={"bold"} goTo={"leaderboard"}/>
                            <LinkPersonalized text={"Duel"} anchor={"skills"} variant={"bold"} goTo={"duel"}/>
                            <LinkPersonalized text={"Simulation"} anchor={"projects"} variant={"bold"}
                                              goTo={"simulation"}/>
                        </div>

                    </div>
                    <div className={"hidden w-screen p-8  flex flex-row justify-between items-center max-lg:flex "}>
                        <p className={"italic font-bold text-lg cursor-pointer"} onClick={() => router.push(`/`)}>Blinded</p>
                        <SheetTrigger asChild>
                            <Button> <HamburgerMenuIcon/> </Button>
                        </SheetTrigger>
                    </div>
                </div>


                <SheetContent>
                    <div className={"p-4"}>
                        <p className={"font-mono font-bold text-lg"}>Menu</p>
                    </div>
                    <div className={"p-4"}>
                        <div className={"flex flex-row items-center"}>
                            <AvatarIcon/>
                            <LinkPersonalized text={"Leaderboard"} anchor={"me"} variant={"bold"} goTo={"leaderboard"}/>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <CookieIcon/>
                            <LinkPersonalized text={"Duel"} anchor={"skills"} variant={"bold"} goTo={"duel"}/>
                        </div>
                        <div className={"flex flex-row items-center"}>
                            <DesktopIcon/>
                            <LinkPersonalized text={"Simulation"} anchor={"projects"} variant={"bold"}
                                              goTo={"simulation"}/>
                        </div>
                    </div>
                </SheetContent>

            </Sheet>
        </>
    )
}