'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layouts/footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  const excludeFooter = pathname.startsWith('/website')

  if (excludeFooter) return null

  return <Footer />
}
