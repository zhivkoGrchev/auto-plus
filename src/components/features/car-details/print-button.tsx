'use client'

import { Button } from '@/components/ui/button'
import { FaPrint } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

export default function PrintButton() {
  const t = useTranslations('CarDialog')

  return (
    <Button className="no-print cursor-pointer" variant="outline" onClick={() => window.print()}>
      <FaPrint />
      {t('print')}
    </Button>
  )
}
