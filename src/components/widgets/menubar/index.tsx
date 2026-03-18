'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export const MenuBar = () => {
  const t = useTranslations('AdminPage')
  const pathname = usePathname()

  return (
    <nav className="flex lg:order-1">
      <menu className="hidden lg:flex gap-2">
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
      <div className="lg:hidden flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-63 sm:w-75">
            <SheetHeader>
              <SheetTitle>Main menu</SheetTitle>
            </SheetHeader>
            <menu className="flex flex-col gap-2">
              <Link className={`px-2 border-l-4 text-white ${pathname === '/admin' && 'border-cyan-400'}`} href="/admin" prefetch={false}>
                {t('websiteAdmin')}
              </Link>
              <Link className={`px-2 border-l-4 text-white ${pathname === '/admin/cars' && 'border-cyan-400'}`} href="/admin/cars" prefetch={false}>
                {t('myCars')}
              </Link>
              <Link className={`px-2 border-l-4 text-white ${pathname === '/admin/profiles' && 'border-cyan-400'}`} href="/admin/profiles" prefetch={false}>
                {t('Profiles')}
              </Link>
            </menu>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
