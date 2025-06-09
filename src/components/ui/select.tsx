import { Select as SelectPrimitive } from 'radix-ui'
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa'

export interface SelectItem {
  text: string
  value: string
}

export interface SelectProps {
  id: string
  placeholder: string
  label: string
  items: SelectItem[]
}

export const Select = ({ id, placeholder, label, items }: SelectProps) => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger
        className="inline-flex justify-between items-center gap-2 grow px-4 py-2 rounded-md border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600 data-[placeholder]:text-foreground/50"
        aria-label={label}
      >
        <SelectPrimitive.Value id={id} placeholder={placeholder} />
        <SelectPrimitive.Icon className="">
          <FaChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="overflow-hidden rounded-md border border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900"
          position="popper"
          sideOffset={4}
          align="end"
        >
          <SelectPrimitive.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-400">
            <FaChevronUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-2">
            {items.map((item: SelectItem) => (
              <SelectPrimitive.Item
                key={item.value}
                className="relative flex select-none items-center rounded-md px-8 py-2 text-[13px] outline-none leading-none text-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800 data-[disabled]:text-foreground/50"
                value={item.value}
              >
                <SelectPrimitive.ItemText>{item.text}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex justify-center items-center">
                  <FaCheck />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-400">
            <FaChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
