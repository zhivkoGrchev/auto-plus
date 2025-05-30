import { Children, cloneElement, HTMLAttributes, isValidElement } from 'react'
import { clsx } from 'clsx/lite'

interface SlotProps extends HTMLAttributes<HTMLElement> {}

export const Slot = ({ className, children, ...props }: SlotProps) => {
  const child = Children.only(children)
  if (!isValidElement<SlotProps>(child)) {
    console.error('Slot component expect a single valid React element as a child')
    return null
  }
  return cloneElement(child, { ...props, ...child.props, className: clsx(className, child.props.className) })
}
