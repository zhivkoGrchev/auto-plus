import Link from 'next/link'
import { ThemeSwitcher } from '@/components/features/theme-switcher'

export const Navbar = () => (
  <nav className="container mx-auto flex justify-between items-center grow p-4">
    <Link href="/" className="text-white text-2xl font-bold">
      Auto Plus
    </Link>
    <div className="flex space-x-4">
      <Link href="/about" className="content-center text-white hover:text-gray-300">
        About
      </Link>
      <Link href="/services" className="content-center text-white hover:text-gray-300">
        Services
      </Link>
      <Link href="/contact" className="content-center text-white hover:text-gray-300">
        Contact
      </Link>
    </div>
    <div className='flex gap-4'>
      <ThemeSwitcher />
      <Link href="/login" className="bg-white text-gray-800 px-4 py-1 rounded-md font-medium hover:bg-gray-100 transition-colors">
        Login
      </Link>
    </div>
  </nav>
)
