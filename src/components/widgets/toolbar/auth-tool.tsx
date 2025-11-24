'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { KeyRound, Loader, LogIn, LogOut, UserPen } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth/client'
import { UserDialog } from '@/components/features/auth/user.dialog'
import { PasswordDialog } from '@/components/features/auth/password.dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export const AuthTool = () => {
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false)
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false)
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()
  const t = useTranslations('AuthTool')

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
        <Loader className="animate-spin" /> Loading ...
      </Button>
    )
  }

  return !session?.user ? (
    <Button variant="outline" asChild>
      <Link href="/auth/sign-in">
        <LogIn />
        {t('sign-in')}
      </Link>
    </Button>
  ) : (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{session.user.name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="p-2 flex flex-col items-center gap-2">
            <Avatar>
              <AvatarFallback>SU</AvatarFallback>
              {session.user.image && <AvatarImage src={session.user.image} />}
            </Avatar>
            <h5 className="text-sm font-bold">
              {session.user.name} - {session.user.email}
            </h5>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setOpenEditUserDialog(true)}>
              <UserPen />
              {t('editUser')}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenChangePasswordDialog(true)}>
              <KeyRound />
              {t('changePassword')}
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
              <LogOut />
              {t('sign-out')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserDialog open={openEditUserDialog} onOpenChange={setOpenEditUserDialog} onUpdate={() => refetch()} />
      <PasswordDialog open={openChangePasswordDialog} onOpenChange={setOpenChangePasswordDialog} onUpdate={() => refetch()} />
    </>
  )
}
