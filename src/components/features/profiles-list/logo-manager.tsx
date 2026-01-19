import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import type { ChangeEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { ImageFile } from '@/lib/types/image'

export interface LogoManagerProps {
  logo: ImageFile
  onAddLogo: (file: File) => void
  onDeleteLogo: () => void
}

export const LogoManager = ({ logo, onAddLogo, onDeleteLogo }: LogoManagerProps) => {
  const handleAddLogo = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length) {
      onAddLogo(target.files[0])
      target.value = ''
      return
    }
    toast.error('Invalid file')
  }

  return (
    <div className="flex justify-center items-center">
      {logo?.imageUrl ? (
        <div className="relative size-24 flex justify-center items-center rounded-md border-2 border-neutral-700 dark:border-neutral-300 bg-cyan-100 dark:bg-cyan-900">
          <Image src={logo.imageUrl} width={96} height={96} alt="Logo" unoptimized />
          <Button className="absolute bottom-1 right-1" type="button" variant="destructive" size="sm" aria-label="Delete logo" onClick={() => onDeleteLogo()}>
            <Trash className="size-3" />
          </Button>
        </div>
      ) : (
        <Label className="size-24 flex justify-center items-center rounded-md border-2 border-dashed border-neutral-700 dark:border-neutral-300 cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800">
          <Plus className="size-8 text-neutral-700 dark:text-neutral-300" />
          <input className="hidden" type="file" accept="image/*" onChange={handleAddLogo} />
        </Label>
      )}
    </div>
  )
}
