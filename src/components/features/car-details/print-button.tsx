'use client'

import { useTranslations } from 'next-intl'
import { FaPrint } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export default function PrintButton() {
  const t = useTranslations('CarDialog')

  return (
    <Button className="no-print cursor-pointer" variant="outline" onClick={() => window.print()}>
      <FaPrint />
      {t('print')}
    </Button>
  )
}
