'use client'

import { useEffect, useState, useTransition } from 'react'
import { FaEdit, FaSpinner, FaTrash } from 'react-icons/fa'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { UserDialog } from './user.dialog'
import { PasswordDialog } from './password.dialog'
import { ProfileDialog } from './profile.dialog'
import { useSession } from '@/lib/auth/client'
import { deleteProfile, getUserWithProfile } from '@/lib/actions/profile.actions'
import type { UserWithProfiles } from '@/lib/types/profile'

export const ProfilesList = () => {
  const { refetch } = useSession()
  const [user, setUser] = useState<UserWithProfiles | undefined>(undefined)
  const [isPendingFetch, startTransitionFetch] = useTransition()

  const fetchUser = () => {
    startTransitionFetch(async () => {
      const { data, error } = await getUserWithProfile()
      if (error) {
        toast.error(error.message)
        return
      }
      setUser(data)
    })
  }

  const handleDeleteProfile = async (id: string) => {
    const { data, error } = await deleteProfile(id)
    if (error) {
      toast.error(error.message)
      return
    }
    fetchUser()
    toast.success(data)
  }

  useEffect(() => fetchUser(), [])

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
          <CardTitle className="text-xl">Company data</CardTitle>
          <CardDescription>You can edit your company data</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Logo: {user?.image ? user.image : 'None'}</li>
            <li>Company name: {user?.name}</li>
            <li>E-Mail: {user?.email}</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <UserDialog
            onUpdate={() => {
              fetchUser()
              refetch()
            }}
          />
          <PasswordDialog
            onUpdate={() => {
              fetchUser()
              refetch()
            }}
          />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profiles</CardTitle>
          <CardDescription>You can add new profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user?.profiles?.length ? (
                  user.profiles.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.slug}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell className="flex justify-center gap-2">
                        <ProfileDialog
                          trigger={
                            <Button variant="outline">
                              <FaEdit />
                            </Button>
                          }
                          profile={item}
                          onUpdate={fetchUser}
                        />
                        <Button variant="outline" onClick={() => handleDeleteProfile(item.id)}>
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="p-8 text-xl text-center">
                      No profiles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <ProfileDialog onUpdate={fetchUser} />
        </CardFooter>
      </Card>
    </div>
  )
}
