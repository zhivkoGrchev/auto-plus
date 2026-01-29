import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export const Navbar = ({ children }: LayoutProps) => {
  return (
    <nav className="container mx-auto p-4 sm:p-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image className="object-contain h-8 w-auto sm:h-10 md:h-12" src="/images/logo.png" alt={APP_NAME} width={77} height={50} priority={true} />
        <span className="text-lg sm:text-xl md:text-2xl font-bold">{APP_NAME}</span>
      </Link>
      {children}
    </nav>
  )
}
