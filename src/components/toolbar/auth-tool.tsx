'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaSpinner } from 'react-icons/fa'
import { signOut, useSession } from '@/lib/auth/client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { toast } from 'sonner'

export const AuthTool = () => {
  const t = useTranslations('AuthTool')
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast(t('sign-out-message'))
          router.push('/auth/sign-in')
        },
      },
    })
  }

  if (isPending) {
    return (
      <Button variant="outline" disabled>
        <FaSpinner className="animate-spin" /> Loading ...
      </Button>
    )
  }

  return !session?.user ? (
    <Button variant="outline" asChild>
      <Link href="/auth/sign-in">{t('sign-in')}</Link>
    </Button>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{session.user.name}</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <h3 className="text-center text-lg font-bold">
          {session.user.name} - {session.user.email}
        </h3>
        <Button variant="destructive" onClick={handleSignOut}>
          {t('sign-out')}
        </Button>
      </PopoverContent>
    </Popover>
  )
}
