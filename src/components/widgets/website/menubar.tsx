import { Menu, Phone } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { ProfileExtended } from '@/types/profile'

interface MenubarProps {
  profile: ProfileExtended
}

export const MenuBar = ({ profile }: MenubarProps) => {
  const slug = profile.slug
  const location = profile.locations.find((item) => item.isMain)
  const t = useTranslations('Website')
  const message = t('navigation.message')

  return (
    <nav className="flex">
      <menu className="hidden lg:flex items-center gap-6">
        <Link className="hover:text-cyan-200 transition" href={`/${slug}`} prefetch={false}>
          {t('navigation.home')}
        </Link>
        <Link className="hover:text-cyan-200 transition" href={`/${slug}/location`} prefetch={false}>
          {t('navigation.location')}
        </Link>
        <Link className="hover:text-cyan-200 transition" href={`/${slug}/opening-hours`} prefetch={false}>
          {t('navigation.openingHours')}
        </Link>
        <Link className="hover:text-cyan-200 transition" href={`/${slug}/contact`} prefetch={false}>
          {t('navigation.contact')}
        </Link>
        {location?.phone && (
          <Link
            className="ml-6 px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition transform hover:scale-105"
            href={`https://wa.me/${location.phone}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
          >
            <Phone size={16} />
            {t('navigation.callButton')}
          </Link>
        )}
      </menu>
      <div className="lg:hidden flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle className="sr-only">Main menu</SheetTitle>
            </SheetHeader>
            <menu className="p-4 flex flex-col gap-2">
              <SheetClose asChild>
                <Link className="hover:text-cyan-200 transition" href={`/${slug}`} prefetch={false}>
                  {t('navigation.home')}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="hover:text-cyan-200 transition" href={`/${slug}/location`} prefetch={false}>
                  {t('navigation.location')}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="hover:text-cyan-200 transition" href={`/${slug}/opening-hours`} prefetch={false}>
                  {t('navigation.openingHours')}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link className="hover:text-cyan-200 transition" href={`/${slug}/contact`} prefetch={false}>
                  {t('navigation.contact')}
                </Link>
              </SheetClose>
              {location?.phone && (
                <SheetClose asChild>
                  <Link
                    className="mt-6 px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition transform hover:scale-105"
                    href={`https://wa.me/${location.phone}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                    <Phone size={16} />
                    {t('navigation.callButton')}
                  </Link>
                </SheetClose>
              )}
            </menu>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
