'use client'

import { createContext, ProviderProps, useCallback, useContext, useState, useTransition } from 'react'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import type { AuthContextData } from '@/lib/types/auth'
import type { User } from '@/lib/generated/prisma'

const AuthContext = createContext<AuthContextData | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}

export const AuthContextProvider = ({ value, ...props }: PartialFields<ProviderProps<User>, 'value'>) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(value)
  const [isPendingFetch, startTransitionFetch] = useTransition()
  const fetchCurrentUser = useCallback(async () => {
    startTransitionFetch(async () => {
      const { data, error } = await getCurrentUser()
      if (error) {
        console.error(error.message)
      }
      setCurrentUser(data)
    })
  }, [setCurrentUser])

  return <AuthContext.Provider value={{ currentUser, isPendingFetch, fetchCurrentUser }} {...props} />
}
