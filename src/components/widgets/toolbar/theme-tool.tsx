'use client'

import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { FaRegMoon } from 'react-icons/fa'
import { LuCheck } from 'react-icons/lu'
import { BsSun } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { THEME } from '@/lib/config/theme'

export const ThemeTool = () => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('ThemeTool')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="dark:bg-cyan-950">
          <BsSun className="hidden dark:flex" />
          <FaRegMoon className="flex dark:hidden" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex justify-between" onClick={() => setTheme(THEME.light)}>
          {t(THEME.light)}
          {theme === THEME.light && <LuCheck />}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between" onClick={() => setTheme(THEME.dark)}>
          {t(THEME.dark)}
          {theme === THEME.dark && <LuCheck />}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between" onClick={() => setTheme(THEME.system)}>
          {t(THEME.system)}
          {theme === THEME.system && <LuCheck />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
