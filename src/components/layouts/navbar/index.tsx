import { APP_NAME } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'

export const Navbar = () => (
  <nav className="container mx-auto flex justify-between items-center p-4">
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.png" // Path to your logo in the public folder
        alt={APP_NAME}
        width={77} // Desired width
        height={50} // Desired height
        className="object-contain" // Keeps aspect ratio
      />
      <span className="text-white text-2xl font-bold">{APP_NAME}</span>
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
