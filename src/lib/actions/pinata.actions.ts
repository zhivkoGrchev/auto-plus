'use server'

import { pinata } from '@/images/pinata'
import type { GaleryImage } from '@/lib/types/galery'

export async function uploadImage(formData: File): Promise<Return<GaleryImage>> {
  try {
    const { cid: imageHash } = await pinata.upload.public.file(formData)
    const imageUrl = await pinata.gateways.public.convert(imageHash)

    return { data: { imageUrl, imageHash }, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Image upload error: ', e.message)
    return { data: undefined, error: { message: e.message || 'An unknown error occurred' } }
  }
}

export async function deleteImage(cid: string) {
  try {
    const response = await fetch(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    })

    if (!response.ok) {
      console.error(`Failed to delete ${cid} from Pinata:`, await response.text())
      return false
    }

    console.log(`Successfully deleted ${cid} from Pinata`)
    return true
  } catch (error) {
    console.error(`Error deleting ${cid} from Pinata:`, error)
    return false
  }
}
