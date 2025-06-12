'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { clsx } from 'clsx/lite'

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = ({ className, children, ...props }: SelectPrimitive.SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={clsx(
      'h-9 px-3 py-2 flex justify-between items-center grow rounded-md border whitespace-nowrap text-sm disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-foreground/50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <FaChevronDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

export const SelectContent = ({ className, children, position = 'popper', ...props }: SelectPrimitive.SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={clsx(
        'relative z-50 max-h-96 rounded-md border overflow-hidden',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className={clsx('p-1 flex justify-center items-center cursor-default', className)} {...props}>
        <FaChevronUp className="size-4 text-foreground/50" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={clsx('p-1', position === 'popper' && 'w-full min-w-[var(--radix-select-trigger-width)] h-[var(--radix-select-trigger-height)]')}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className={clsx('p-1 flex justify-center items-center cursor-default', className)} {...props}>
        <FaChevronDown className="size-4 text-foreground/50" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

export const SelectItem = ({ className, children, ...props }: SelectPrimitive.SelectItemProps) => (
  <SelectPrimitive.Item
    className={clsx(
      'relative w-full pl-2 pr-8 py-1.5 flex items-center rounded-md outline-none text-sm leading-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none cursor-default select-none',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute right-2 size-4 flex justify-center items-center">
      <FaCheck className="size-4" />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

export const SelectLabel = ({ className, ...props }: SelectPrimitive.SelectLabelProps) => (
  <SelectPrimitive.Label className={clsx('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
)

export const SelectSeparator = ({ className, ...props }: SelectPrimitive.SelectSeparatorProps) => (
  <SelectPrimitive.Separator className={clsx('-mx-1 my-1 h-px bg-foreground/50', className)} {...props} />
)
