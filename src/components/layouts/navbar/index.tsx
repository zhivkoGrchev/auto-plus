import Link from 'next/link'

export const Navbar = () => (
  <nav className="container mx-auto flex justify-between items-center p-4">
    <Link href="/" className="text-white text-2xl font-bold">
      Auto Plus
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
