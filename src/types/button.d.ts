import type { ClassValue } from 'clsx/lite'

export type ButtonVariants = {
  PRIMARY: ClassValue
  SECONDARY: ClassValue
  DESTRUCTIVE: ClassValue
  FLAT: ClassValue
  LINK: ClassValue
}

export type ButtonVariant = keyof ButtonVariants
