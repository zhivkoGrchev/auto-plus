'use client'

import { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { FaSpinner } from 'react-icons/fa'
import { setUserLocale } from '@/services/locale'
import type { Locale } from '@/lib/config/locale'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

export const LocaleTool = () => {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const t = useTranslations('LocaleTool')

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <Select onValueChange={onChange} defaultValue={locale}>
      <SelectTrigger disabled={isPending} aria-label={t('label')}>
        {isPending && <FaSpinner className="animate-spin" />} {locale.toUpperCase()}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('en')}</SelectItem>
        <SelectItem value="de">{t('de')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
