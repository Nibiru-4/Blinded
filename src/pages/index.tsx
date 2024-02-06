import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Button} from "@/components/ui/button";
import {HomePage} from "@/components/kit/HomePage";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <main>
           <HomePage />
        </main>
    )
}
