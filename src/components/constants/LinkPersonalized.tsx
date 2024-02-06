"use client";
import React from "react";
import {Link} from "react-scroll/modules"
import {useRouter} from "next/router";

interface LinkProps {
    text: string,
    variant: "bold" | "normal",
    anchor : string,
    goTo : string | undefined
}

export const LinkPersonalized = (props: LinkProps) => {

    const router = useRouter()

    const clickEvent = () => {
        if(props.goTo){
            router.push(`/${props.goTo}`)
        }
    }

    switch (props.variant) {
        case "bold":
            return (
                <Link activeClass={"active"} to={props.anchor} spy={true} smooth={true} >
                    <p onClick={clickEvent} className={"flex font-bold font-mono p-4 cursor-pointer hover:underline hover:animate-pulse"}>{props.text}</p>
                </Link>
            )
        case "normal":
            return (
                <Link activeClass={"active"} to={props.anchor} spy={true} smooth={true} >
                    <p onClick={clickEvent} className={"flex  font-mono p-4 cursor-pointer hover:underline hover:animate-pulse"}>{props.text}</p>
                </Link>
            )

    }

}

