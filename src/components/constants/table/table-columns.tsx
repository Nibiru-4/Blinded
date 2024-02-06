import {ColumnDef} from "@tanstack/react-table";

export type Player = {
    id: number
    gamerTag: string
    elo : number
}

export const columns: ColumnDef<Player>[] = [

    {
        accessorKey:"gamerTag",
        header: "Nom d'utilisateur"
    },
    {
        accessorKey:"elo",
        header:"Elo"
    }
]