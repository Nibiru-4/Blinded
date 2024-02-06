import React from "react"
import {Menu} from "@/components/constants/Menu";
import {columns, Player} from "@/components/constants/table/table-columns";
import {DataTable} from "@/components/constants/table/data-table";
import {useRouter} from "next/router";


const players : Player[] = [
        {
            id : 0,
            gamerTag:"Alson",
            elo : 1000
        },
        {
            id : 1,
            gamerTag:"Blson",
            elo : 1023
        },
        {
            id : 2,
            gamerTag:"Clson",
            elo : 1500
        },
        {
            id : 3,
            gamerTag:"Dlson",
            elo : 1600
        },
        {
            id : 4,
            gamerTag:"Elson",
            elo : 1009
        },
        {
            id : 5,
            gamerTag:"Felson",
            elo : 990
        }
    ]



const index =  () => {

    const router = useRouter()

    const filteredPlayer = players.sort( (a,b) => b.elo - a.elo)
    console.log(filteredPlayer)

    return (
        <>
            <Menu/>
            <div className={"p-8"}>
                <div className={"font-mono cursor-pointer"} onClick={() => router.push("/")}>Accueil /</div>
                <div className={"p-4 font-mono font-bold italic"}>Leaderboard</div>
                <div>
                    <DataTable columns={columns} data={players} />
                </div>

            </div>

        </>
    )
}

export default index