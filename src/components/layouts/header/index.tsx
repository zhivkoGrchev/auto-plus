import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx/lite'

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header = ({ className, children }: HeaderProps) => <header className={clsx('flex bg-cyan-600 dark:bg-cyan-900', className)}>{children}</header>
