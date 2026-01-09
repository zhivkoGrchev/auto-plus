'use client'

import { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Globe, Check } from 'lucide-react'
import { setUserLocale } from '@/services/locale'
import type { Locale } from '@/lib/config/locale'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('label')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange('en')} className="flex justify-between">
          {t('en')}
          {locale === 'en' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange('de')} className="flex justify-between">
          {t('de')}
          {locale === 'de' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
