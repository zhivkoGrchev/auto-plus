'use client'

import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '../auth/context'
import { EditProfile } from './edit-profile'

export const Profile = () => {
  const { currentUser, isPendingFetch, fetchCurrentUser } = useAuthContext()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  if (isPendingFetch)
    return (
      <div className="flex flex-col justify-center items-center grow gap-4 text-5xl">
        <FaSpinner className="animate-spin" /> Loading ...
      </div>
    )

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-start gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>You can edit your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Image: {currentUser?.image ? currentUser.image : 'None'}</li>
            <li>Name: {currentUser?.name}</li>
            <li>E-Mail: {currentUser?.email}</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <EditProfile />
          <Button disabled>Add place</Button>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-2">
        <h3 className="p-4 border rounded-xl bg-card text-card-foreground text-center font-bold shadow-sm">Places</h3>
      </div>
    </div>
  )
}
