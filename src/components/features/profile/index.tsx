'use client'

import { useEffect, useState, useTransition } from 'react'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import type { User } from '@/lib/generated/prisma'

export const Profile = () => {
  const [user, setUser] = useState<User | undefined>()
  const [isPendingFetch, startTransitionFetch] = useTransition()

  useEffect(() => {
    startTransitionFetch(async () => {
      const { data, error } = await getCurrentUser()
      if (error) {
        console.error('Error fetching user', error.message)
      }
      setUser(data)
    })
  }, [])

  if (isPendingFetch) return <div>Loading user...</div>

  return <div className="grid gap-4">{<div>{user?.name}</div>}</div>
}
