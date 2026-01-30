import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getChangedFields<T extends Record<string, any>>(original: T, updated: T): T {
  return (Object.keys(updated) as Array<keyof T>).reduce((acc, field) => {
    if (updated[field] !== original[field]) acc[field] = updated[field]
    return acc
  }, {} as T)
}

export function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function resizeImage(file: File, maxWidth = 800, maxHeight = 600, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    img.onload = () => {
      let { width, height } = img
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          } else {
            reject(new Error('Failed to create resized image blob'))
          }
        },
        file.type,
        quality
      )
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}

export const normalize = (s: unknown) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()

export const formatName = (name: string) => {
  const parts = name.trim().split(/\s+/)
  if (parts.length > 1) return parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
  else if (parts.length === 1) return parts[0][0].toUpperCase() + parts[0][1].toLowerCase()
  else return ''
}
