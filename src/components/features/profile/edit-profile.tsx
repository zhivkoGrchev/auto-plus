import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const EditProfile = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>You can edit your profile</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <Label className="self-center" htmlFor="name">
            Name
          </Label>
          <Input id="name" name="name" />
          <Label className="self-center" htmlFor="email">
            E-Mail
          </Label>
          <Input id="email" name="email" type="email" />
          <Label className="self-center" htmlFor="password">
            Password
          </Label>
          <Input id="password" name="password" type="password" />
        </div>
        <DialogFooter>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
