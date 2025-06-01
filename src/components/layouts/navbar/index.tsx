import { APP_NAME } from '@/types/global-constants'
import Link from 'next/link'
import LocaleSwitcher from '@/components/translation/LocaleSwitcher'

export const Navbar = () => (
  <nav className="container mx-auto flex justify-between items-center p-4">
    <Link href="/" className="text-white text-2xl font-bold">
      {APP_NAME}
    </Link>
    <div className="flex space-x-4">
      <Link
        href="/login"
        className="ml-12 bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
      >
        Login
      </Link>
      <LocaleSwitcher />
    </div>
  </nav>
)
