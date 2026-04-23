import Link from 'next/link'
import { MenuBar } from '@/components/widgets/website/menubar'
import type { ProfileExtended } from '@/types/profile'

interface HeaderProps {
  profile: ProfileExtended
}

export const Header = ({ profile }: HeaderProps) => {
  const slug = profile.slug
  const company = profile.company || 'Firmenname'

  return (
    <header className="px-8 bg-cyan-900 text-white shadow-md">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link className="flex items-center gap-2 text-2xl font-bold tracking-wide" href={`/${slug}`}>
          {company}
        </Link>
        <MenuBar profile={profile} />
      </div>
    </header>
  )
}
