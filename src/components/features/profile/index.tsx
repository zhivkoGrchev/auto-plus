'use client'

import { useEffect, useState, useTransition } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useSession } from '@/lib/auth/client'
import { getUserWithProfile } from '@/lib/actions/profile.actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserWithProfiles } from '@/lib/types/profile'
import { UserDialog } from './user.dialog'
import { PasswordDialog } from './password.dialog'
import { ProfileDialog } from './profile.dialog'

export const Profile = () => {
  const { refetch } = useSession()
  const [user, setUser] = useState<UserWithProfiles | undefined>(undefined)
  const [isPendingUser, startTransitionUser] = useTransition()

  const fetchUser = () => {
    startTransitionUser(async () => {
      const { data, error } = await getUserWithProfile()
      if (error) {
        console.error(error.message)
        return
      }
      setUser(data)
    })
  }

  const handleUpdate = () => {
    fetchUser()
    refetch()
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (isPendingUser)
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <FaSpinner className="animate-spin" /> Loading ...
      </div>
    )

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-start gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">User data</CardTitle>
          <CardDescription>You can edit your user</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Image: {user?.image ? user.image : 'None'}</li>
            <li>Name: {user?.name}</li>
            <li>E-Mail: {user?.email}</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <UserDialog onUpdate={handleUpdate} />
          <PasswordDialog onUpdate={handleUpdate} />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profiles</CardTitle>
          <CardDescription>You can add new profiles</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.profiles
            ? user.profiles.map((item) => (
                <ul key={item.id} className="not-first:mt-2 pb-2 border-b">
                  <li>Organization: {item.organization ? item.organization : '-'}</li>
                  <li>Address: {item.address ? item.address : '-'}</li>
                  <li>Phone number: {item.phoneNumber ? item.phoneNumber : '-'}</li>
                </ul>
              ))
            : 'None'}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <ProfileDialog user={user} />
        </CardFooter>
      </Card>
    </div>
  )
}
