'use client'

import { useEffect, useState } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { BsSun } from 'react-icons/bs'
import { Toggle } from 'radix-ui'

export const ThemeTool = () => {
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
      {isDarkTheme ? <BsSun /> : <FaRegMoon />}
    </Toggle.Root>
  )
}
