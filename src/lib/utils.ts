import { clsx, type ClassValue } from 'clsx'
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

export const normalize = (s: unknown) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
