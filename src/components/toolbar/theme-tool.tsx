'use client'

import { useEffect, useState } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { BsSun } from 'react-icons/bs'
import { Toggle } from '../ui/toggle'

export const ThemeTool = () => {
  const [isDarkTheme, setDarkTheme] = useState<boolean>(false)
  useEffect(() => setDarkTheme(localStorage.theme === 'dark'), [])
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkTheme)
    localStorage.theme = isDarkTheme ? 'dark' : 'light'
  }, [isDarkTheme])

  return (
    <Toggle variant="outline" pressed={isDarkTheme} onPressedChange={setDarkTheme}>
      {isDarkTheme ? <BsSun /> : <FaRegMoon />}
    </Toggle>
  )
}
