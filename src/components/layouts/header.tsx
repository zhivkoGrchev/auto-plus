import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header = ({ className, children }: HeaderProps) => (
  <header className={clsx('flex bg-header text-header-foreground border-b', className)}>
    <div className="container mx-auto p-4 sm:p-6 flex items-center gap-2 sm:gap-3 md:gap-4">{children}</div>
  </header>
)
