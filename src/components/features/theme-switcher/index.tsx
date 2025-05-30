'use client'

import { ButtonHTMLAttributes, useLayoutEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ThemeSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ThemeSwitcher = ({ className, ...props }: ThemeSwitcherProps) => {
  const [isDarkMode, setDarkMode] = useState<boolean>()
  useLayoutEffect(() => {
    if (isDarkMode) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [isDarkMode])

  return (
    <Button className={className} variant="FLAT" size="ICON" onClick={() => setDarkMode((mode) => !mode)} {...props}>
      {isDarkMode ? <Moon size="1em" /> : <Sun size="1em" />}
    </Button>
  )
}
