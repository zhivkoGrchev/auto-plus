import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {}

export const Overlay = ({ className, children, onClick, ...props }: OverlayProps) => (
  <div className={clsx('absolute inset-0 flex justify-center items-center bg-overlay/80', className)} onClick={onClick} {...props}>
    {children}
  </div>
)
