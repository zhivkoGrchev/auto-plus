import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { ToolBar } from '@/components/toolbar'

export const Navbar = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center p-4 sm:p-6">
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <Image src="/images/logo.png" alt={APP_NAME} width={77} height={50} className="object-contain h-8 w-auto sm:h-10 md:h-12" priority={true} />
        <span className="text-cyan-50 text-lg sm:text-xl md:text-2xl font-bold">{APP_NAME}</span>
      </Link>
      <ToolBar />
    </nav>
  )
}
