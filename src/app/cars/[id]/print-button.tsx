'use client'

import { Button } from '@/components/ui/button'
import { FaPrint } from 'react-icons/fa'

export default function PrintButton() {
  return (
    <Button variant="outline" onClick={() => window.print()}>
      <FaPrint />
      Print
    </Button>
  )
}
