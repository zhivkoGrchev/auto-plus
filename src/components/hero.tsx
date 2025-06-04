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
    <div className="relative h-screen">
      <div className="absolute -z-10 inset-0">
        <Image src={props.imgData} alt={props.imgAlt} fill style={{ objectFit: 'cover' }} />
      </div>
      <div>
        <h1 className="text-cyan-50 text-4xl">{props.title}</h1>
        <h2 className="text-cyan-50 text-2xl">{props.description}</h2>
      </div>
      <Link href="/demo" className="ml-12 bg-cyan-600 text-cyan-50 px-4 py-1 rounded-md font-medium hover:bg-cyan-400 transition-colors">
        {props.startDemo}
      </Link>
    </div>
  )
}
