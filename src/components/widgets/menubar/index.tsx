'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export const MenuBar = () => {
  const pathname = usePathname()
  const t = useTranslations('AdminPage')

  return (
    <menu className="flex gap-2">
      <Link className={`px-2 border-b-4 text-white ${pathname === '/admin' && 'border-cyan-400'}`} href="/admin" prefetch={false}>
        {t('websiteAdmin')}
      </Link>
      <Link className={`px-2 border-b-4 text-white ${pathname === '/admin/cars' && 'border-cyan-400'}`} href="/admin/cars" prefetch={false}>
        {t('myCars')}
      </Link>
      <Link className={`px-2 border-b-4 text-white ${pathname === '/admin/profiles' && 'border-cyan-400'}`} href="/admin/profiles" prefetch={false}>
        {t('Profiles')}
      </Link>
    </menu>
  )
}
