'use client'

import { useEffect } from 'react'
import { useAuthContext } from '../auth/context'

export const Profile = () => {
  const { currentUser, isPendingFetch, fetchCurrentUser } = useAuthContext()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  if (isPendingFetch) return <div>Loading user...</div>

  return <div className="grid gap-4">{<div>{currentUser?.name}</div>}</div>
}
