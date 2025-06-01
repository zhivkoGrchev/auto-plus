import { clsx } from 'clsx/lite'
import { LuLoaderCircle } from 'react-icons/lu'

type SpinnerProps = React.SVGAttributes<SVGElement> & {
  className?: string;
}

export const Spinner = ({ className, ...props }: SpinnerProps) => (
  <LuLoaderCircle className={clsx('animate-spin', className)} {...props} />
)
