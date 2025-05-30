import { HTMLAttributes } from 'react'
import { clsx } from 'clsx/lite'

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header = ({ className, children }: HeaderProps) => <header className={clsx('flex bg-header-background', className)}>{children}</header>
