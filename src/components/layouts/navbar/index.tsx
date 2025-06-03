import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import LocaleSwitcher from '@/components/translation/LocaleSwitcher'
import { useTranslations } from 'next-intl'

export const Navbar = () => {
  const t = useTranslations('Navbar')

  return (
    <nav className="container mx-auto flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logo.png" // Path from public folder
          alt={APP_NAME} // Accessibility
          width={77} // Desired display width
          height={50} // Desired display height
          className="object-contain" // Keep aspect ratio
        />
        <span className=" text-cyan-50 text-2xl font-bold">{APP_NAME}</span>
      </Link>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="ml-12 bg-cyan-50 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          {t('login')}
        </Link>
        <LocaleSwitcher />
      </div>
    </nav>
  )
}
