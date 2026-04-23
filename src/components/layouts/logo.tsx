import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/constants'

export const Logo = () => {
  return (
    <Link href="/" className="mr-auto flex items-center gap-2 shrink-0">
      <Image className="object-contain h-8 w-auto sm:h-10 md:h-12" src="/images/logo.png" alt={APP_NAME} width={77} height={50} priority={true} />
      <span className="text-lg sm:text-xl md:text-2xl font-bold">{APP_NAME}</span>
    </Link>
  )
}
