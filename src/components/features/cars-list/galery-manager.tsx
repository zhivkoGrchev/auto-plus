import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ChangeEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { ImageFile } from '@/lib/types/image'

export interface GaleryManagerProps {
  images: ImageFile[]
  onAddImages: (files: File[]) => void
  onDeleteImage: (key: number) => void
}

export const GaleryManager = ({ images, onAddImages, onDeleteImage }: GaleryManagerProps) => {
  const t = useTranslations('GaleryManager')
  const handleAddImages = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length) {
      onAddImages([...target.files])
      return
    }
    toast.error('Invalid files')
  }

  return (
    <div className="flex flex-col gap-4">
      <h5>{t('title')}</h5>
      <div className="flex justify-center gap-2 flex-wrap">
        {images.map((item, index) => (
          <div className="relative size-24 rounded-md border-2 border-neutral-300" key={index}>
            <Image className="object-cover" src={item.imageUrl} width={96} height={96} alt={`Preview ${index + 1}`} />
            <Button className="absolute bottom-1 right-1 size-6 rounded" type="button" variant="destructive" size="sm" onClick={() => onDeleteImage(index)}>
              <Trash className="size-3" />
            </Button>
            {index === 0 && <span className="absolute bottom-1 left-1 px-2.5 py-1 rounded bg-blue-500 text-white text-xs">Main</span>}
          </div>
        ))}
        <Label className="size-24 flex flex-col justify-center items-center gap-2 rounded-md border-2 border-dashed border-neutral-700 dark:border-neutral-300 cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800">
          <Plus className="size-8 text-neutral-700 dark:text-neutral-300" />
          <input className="hidden" id="carImage" type="file" accept="image/*" multiple onChange={handleAddImages} />
        </Label>
      </div>
    </div>
  )
}
