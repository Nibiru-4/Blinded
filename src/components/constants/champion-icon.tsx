import React from "react"
import Image from "next/image";


interface IchampionIcon {
    id: string,
    tags : string[]
    isActif : boolean
}


export const ChampionIcon = (props: IchampionIcon) => {



    return (<>
        <div className={`p-2 cursor-pointer  h-24 `}>
            <Image src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${props.id}.png`}
                   width={150} height={150} alt={props.id}
            />
        </div>


    </>)

}