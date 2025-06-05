'use client'

import { HiCheck } from 'react-icons/hi2'
import { Select } from 'radix-ui'
import clsx from 'clsx'
import { useTransition } from 'react'
import type { Locale } from '@/lib/config/locale'
import { setUserLocale } from '@/services/locale'

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx('bg-cyan-50 rounded-md px-4 py-2 flex items-center text-cyan-900 transition-colors', isPending && 'pointer-events-none opacity-60')}
        >
          <span>{defaultValue.toUpperCase()}</span>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content align="end" className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md" position="popper">
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">{item.value === defaultValue && <HiCheck className="h-5 w-5 text-slate-600" />}</div>
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
