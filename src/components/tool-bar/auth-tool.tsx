'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FaSpinner } from 'react-icons/fa'
import { authClient } from '@/lib/auth/client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.custom'
import { useAuthContext } from '../features/auth/context'

export const AuthTool = () => {
  const t = useTranslations('Navbar')
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
      <span className="flex items-center justify-center gap-2 ml-12 px-4 py-2 rounded-md bg-background hover:bg-background/50 font-medium transition-colors">
        <FaSpinner className="animate-spin" /> Loading ...
      </span>
    )
  }

  return currentUser ? (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-2 ml-12 px-4 py-2 rounded-md bg-background hover:bg-background/50 font-medium transition-colors">
        {currentUser.name}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center items-center gap-2 p-4 rounded-md bg-background">
        <h3 className="text-lg font-bold">
          {currentUser.name} - {currentUser.email}
        </h3>
        <button onClick={handleSignOut}>Sign Out</button>
      </PopoverContent>
    </Popover>
  ) : (
    <Link
      className="flex items-center justify-center gap-2 ml-12 px-4 py-2 rounded-md bg-background hover:bg-background/50 font-medium transition-colors"
      href="/auth/sign-in"
    >
      {t('login')}
    </Link>
  )
}
