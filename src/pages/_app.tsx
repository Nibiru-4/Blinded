import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Cinzel, Inter } from 'next/font/google'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${cinzel.variable} ${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
