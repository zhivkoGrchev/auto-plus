import { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx/lite'

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={clsx(
      'inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600',
      className
    )}
    {...props}
  />
)
