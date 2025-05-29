import { LoaderCircle, LucideProps } from 'lucide-react'
import { clsx } from 'clsx/lite'

export const Spinner = ({ className, ...props }: LucideProps) => <LoaderCircle className={clsx('animate-spin', className)} {...props} />
