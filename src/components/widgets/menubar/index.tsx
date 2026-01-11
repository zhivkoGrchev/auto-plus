'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const MenuBar = () => {
  const pathname = usePathname()

  return (
    <menu className="flex gap-2">
      <Link className={`px-2 border-b-4 text-white ${pathname === '/admin' && 'border-cyan-400'}`} href="/admin" prefetch={false}>
        Website admin
      </Link>
      <Link className={`px-2 border-b-4 text-white ${pathname === '/admin/cars' && 'border-cyan-400'}`} href="/admin/cars" prefetch={false}>
        My Cars
      </Link>
      <Link className={`px-2 border-b-4 text-white ${pathname === '/admin/profiles' && 'border-cyan-400'}`} href="/admin/profiles" prefetch={false}>
        Profiles
      </Link>
    </menu>
  )
}
