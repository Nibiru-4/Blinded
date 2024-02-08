import React from "react"
import {Menu} from "@/components/constants/Menu";
import Image from "next/image"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const index = () => {
    return (
        <>
            <Menu/>
            <div>
                <div className={"flex flex-row items-center justify-center max-lg:flex-col"}>

                    <AlertDialog>
                        <AlertDialogTrigger
                            className={"flex flex-col hover:shadow-xl m-4 items-center justify-center p-8"}>
                            <Image src={require("../../../public/chibiLux.png")} alt={"chibi"} width={250} height={250}/>
                            <div className={"font-mono font-bold italic"}>Partie normale</div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Attention !</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ce site est une &quot;proof of concept&quot; et n&apos;est pas fonctionnel.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Dommage...</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                        <AlertDialogTrigger
                            className={"flex flex-col hover:shadow-xl m-4 items-center justify-center p-8"}>
                            <Image src={require("../../../public/chibiLee.png")} alt={"chibi"} width={250} height={250}/>
                            <div className={"font-mono font-bold italic"}>Partie Classé</div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Attention !</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ce site est une &quot;proof of concept&quot; et n&apos;est pas fonctionnel.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Dommage...</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>


                </div>

                <div className={"p-8 flex flex-col items-center justify-center"}>
                    <div className={"p-4"}>
                        <Input className={"font-mono"} placeholder={"code"}/>
                    </div>
                    <div className={"font-bold font-mono italic p-4"}>Rejoindre quelqu&apos;un</div>
                    <AlertDialog>
                        <AlertDialogTrigger className={"font-bold font-mono underline"}>Créer une partie</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Attention !</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ce site est une &quot;proof of concept&quot; et n&apos;est pas fonctionnel.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Dommage...</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </>
    )
}

export default index