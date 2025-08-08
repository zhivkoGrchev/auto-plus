import { Popover as PopoverPrimitive } from 'radix-ui'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverContent = ({ children, ...props }: PopoverPrimitive.PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content {...props}>
      {children}
      <PopoverPrimitive.Arrow className="fill-background text-background" />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
)
