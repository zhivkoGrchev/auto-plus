'use client'

import { AuthTool } from './auth-tool'
import { LocaleTool } from './locale-tool'
import { ThemeTool } from './theme-tool'

export const ToolBar = () => (
  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto lg:order-2 text-foreground">
    <LocaleTool />
    <ThemeTool />
    <AuthTool />
  </div>
)
