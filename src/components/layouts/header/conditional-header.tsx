'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'

export function ConditionalHeader() {
  const pathname = usePathname()
  const excludeHeader = pathname.startsWith('/website')

  if (excludeHeader) return null

  return (
    <Header>
      <Navbar />
    </Header>
  )
}
