import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx/lite'
import { Slot } from '@/components/shared/slot'
import type { ButtonVariant, ButtonVariants } from '@/lib/types/button'
import type { Sizes as ButtonSizes, Size as ButtonSize } from '@/lib/types/sizes'

const styles: ButtonVariants & ButtonSizes = {
  PRIMARY: 'bg-primary hover:bg-primary/50 border-accent',
  SECONDARY: 'bg-secondary hover:bg-secondary/50 border-accent',
  DESTRUCTIVE: 'bg-destructive hover:bg-destructive/50 border-accent',
  FLAT: 'bg-transparent border-transparent',
  LINK: 'bg-transparent border-transparent hover:bg-transparent hover:underline underline-offset-4',
  ICON: 'p-1',
  S: 'px-4 py-2',
  M: 'px-5 py-3',
  L: 'px-6 py-4',
} as const

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  parent?: boolean
}

export const Button = ({ className, variant = 'SECONDARY', size = 'M', parent, ...props }: ButtonProps) => {
  const Component = parent ? Slot : 'button'
  return (
    <Component
      className={clsx(
        'inline-flex items-center gap-2 align-middle border rounded-md whitespace-nowrap cursor-pointer transition-colors',
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    />
  )
}
