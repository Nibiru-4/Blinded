import React from "react"
import {useRouter} from "next/router";
import {Menu} from "@/components/constants/Menu";
import {Champion} from "@/pages/simulation";
import {ChampionIcon} from "@/components/constants/champion-icon";
import {Button} from "@/components/ui/button";
import Image from "next/image"


import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";


interface IValidation {

}

const Validation = (props: IValidation) => {

    const router = useRouter()

    const bluePicks: Champion[] = JSON.parse(router.query.one)
    const redPicks: Champion[] = JSON.parse(router.query.two)


    type resultDroppable = {
        droppableId: string,
        index: number
    }

    const dragEndHandlerRed = (result) => {
        const source : resultDroppable = result.source ?? {droppableId: "red", index: 0}
        const destination : resultDroppable = result.destination ?? {droppableId: "red", index: 0}

        //invert the source and destination
        const sourceChampion = redPicks[source.index]
        redPicks[source.index] = redPicks[destination.index]
        redPicks[destination.index] = sourceChampion
    }

    const dragEndHandlerBlue = (result) => {
        const source : resultDroppable = result.source ?? {droppableId: "blue", index: 0}
        const destination : resultDroppable = result.destination ?? {droppableId: "blue", index: 0}

        //invert the source and destination
        const sourceChampion = bluePicks[source.index]
        bluePicks[source.index] = bluePicks[destination.index]
        bluePicks[destination.index] = sourceChampion
    }



    return (
        <>
            <Menu/>

            <div>
                <div className={" flex flex-col justify-center items-center"}>
                    <p className={"p-8 font-mono font-bold"}>Validation (Swap Phase)</p>


                    <div className={" flex flex-col justify-center items-center"}>
                        <div className={"flex"}>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/toplane.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/jungle.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/mid.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/adc.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/support.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                        </div>
                        <div className={" flex m-8 h-1/2 w-1/2"}>
                            <DragDropContext onDragEnd={dragEndHandlerBlue} >
                                <Droppable droppableId={"red"} direction={"horizontal"}>
                                    {(provided, snapshot) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className={"flex"}>
                                            {bluePicks.map((champion: Champion, index: number) => {
                                                return (
                                                    <Draggable key={champion.id} draggableId={champion.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <ChampionIcon id={champion.id} tags={champion.tags}
                                                                              isActif={champion.isActif}/>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>

                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                    <div className={" flex flex-col justify-center items-center"}>
                        <div className={"flex"}>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/toplane.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/jungle.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/mid.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/adc.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                            <div className={"m-4"}>
                                <Image src={require("../../../../public/roles/support.png")} alt={"chibi"} w={50} height={50}/>
                            </div>
                        </div>
                        <div className={" flex m-8 h-1/2 w-1/2"}>
                            <DragDropContext onDragEnd={dragEndHandlerRed}>
                                <Droppable droppableId={"red"} direction={"horizontal"}>
                                    {(provided, snapshot) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className={"flex"}>
                                            {redPicks.map((champion: Champion, index: number) => {
                                                return (
                                                    <Draggable key={champion.id} draggableId={champion.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <ChampionIcon id={champion.id} tags={champion.tags}
                                                                              isActif={champion.isActif}/>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>

                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger
                            className={"flex flex-col hover:shadow-xl  items-center justify-center"}>
                            <Button>Valider</Button>
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
            </div>
            <div>

            </div>
        </>

    )

}

export default Validation