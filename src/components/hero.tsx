import type { StaticImageData } from 'next/image'
import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
  imgData: StaticImageData
  imgAlt: string
  title: string
  description: string
  startDemo: string
}

export default function Hero(props: HeroProps) {
  return (
    <div className="relative text-cyan-50 flex flex-col items-center justify-center h-screen w-full">
      <div className="absolute -z-10 inset-0">
        <Image src={props.imgData} alt={props.imgAlt} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900" />
      <div className="text-center px-4 z-10 mb-auto pt-30">
        <h1 className="text-cyan-50 text-4xl">{props.title}</h1>
        <h2 className="mb-10 text-cyan-50 text-2xl">{props.description}</h2>
        <Link href="/demo" className="ml-12 mt-5 bg-cyan-600 text-cyan-50 px-4 py-1 rounded-md font-medium hover:bg-cyan-400 transition-colors">
          {props.startDemo}
        </Link>
      </div>
    </div>
  )
}
