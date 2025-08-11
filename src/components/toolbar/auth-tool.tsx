'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaSpinner } from 'react-icons/fa'
import { authClient } from '@/lib/auth/client'
import { useAuthContext } from '../features/auth/context'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

export const AuthTool = () => {
  const t = useTranslations('AuthTool')
  const { currentUser, isPendingFetch, fetchCurrentUser } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  const handleSignOut = async () => {
    await authClient.signOut()
    fetchCurrentUser()
    router.push('/')
  }

  if (isPendingFetch) {
    return (
      <Button variant="outline" disabled>
        <FaSpinner className="animate-spin" /> Loading ...
      </Button>
    )
  }

  return currentUser ? (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{currentUser.name}</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-bold">
          {currentUser.name} - {currentUser.email}
        </h3>
        <Button variant="destructive" onClick={handleSignOut}>
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  ) : (
    <Button variant="outline" asChild>
      <Link href="/auth/sign-in">{t('login')}</Link>
    </Button>
  )
}
