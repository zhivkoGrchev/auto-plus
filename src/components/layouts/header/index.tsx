import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header = ({ className, children }: HeaderProps) => (
  <header className={clsx('flex bg-header text-header-foreground border-b', className)}>{children}</header>
)
