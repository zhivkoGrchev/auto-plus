import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { ToolBar } from '@/components/toolbar'

export const Navbar = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logo.png" // Path from public folder
          alt={APP_NAME} // Accessibility
          width={77} // Desired display width
          height={50} // Desired display height
          className="object-contain" // Keep aspect ratio
        />
        <span className=" text-cyan-50 text-2xl font-bold">{APP_NAME}</span>
      </Link>
      <ToolBar />
    </nav>
  )
}
