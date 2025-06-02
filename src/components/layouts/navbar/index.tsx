import { APP_NAME } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import img from '@/app/auto-plus-logo.png'

export const Navbar = () => (
  <nav className="container mx-auto flex justify-between items-center p-4">
    <Image src={img} alt='logo'/>
    <Link href="/" className="text-white text-2xl font-bold">
      {APP_NAME}
    </Link>
    <div className="flex space-x-4">
      <Link
        href="/login"
        className="ml-12 bg-white text-gray-800 px-4 py-1 rounded-md font-medium hover:bg-gray-100 transition-colors"
      >
        Login
      </Link>
    </div>
  </nav>
)
