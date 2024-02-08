import React from "react"
import Image from "next/image";
import {Button} from "@/components/ui/button.tsx";
import {useRouter} from "next/router";


export const Body = () => {

    const router = useRouter()

    return (
        <div>
            <div className={"flex flex-row justify-between items-center m-20 max-lg:flex-col"}>
                <div className={" w-1/2  flex flex-col items-center justify-center"}>
                    <p className={"font-mono font-bold p-10"}>Qui sommes-nous</p>
                    <p className={"text-justify font-mono font-bold"}>Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Harum, nobis possimus quas quisquam quos totam.</p>
                </div>

                <div className={"flex flex-col items-center justify-center"}>
                    <p className={"font-mono font-bold p-10"}>Blinded</p>
                    <Image src={require("../../../public/chibiLee.png")} alt={"chibi"} w={250} height={250}/>
                </div>
            </div>

            <div className={"w-screen flex items-center justify-center"}>
                <Button onClick={() => router.push(`/duel`)}>Jouer</Button>
            </div>
        </div>
    )
}