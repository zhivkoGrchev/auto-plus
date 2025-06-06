'use client'

import { useEffect, useState } from 'react'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'
import { Toggle } from 'radix-ui'

export const ThemeSwitcher = () => {
  const [isDarkTheme, setDarkTheme] = useState<boolean>(false)
  useEffect(() => setDarkTheme(localStorage.theme === 'dark'), [])
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkTheme)
    localStorage.theme = isDarkTheme ? 'dark' : 'light'
  }, [isDarkTheme])

  return (
    <Toggle.Root
      className="flex justify-center items-center px-4 py-2 rounded-md bg-background hover:bg-background/50 transition-colors"
      pressed={isDarkTheme}
      onPressedChange={setDarkTheme}
    >
      {isDarkTheme ? <FaRegMoon /> : <FaRegSun />}
    </Toggle.Root>
  )
}
