'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AuthTool } from './auth-tool'
import { LocaleTool } from './locale-tool'
import { ThemeTool } from './theme-tool'

export const ToolBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {/* Always visible: AuthTool */}
      <AuthTool />

      {/* Desktop: Show all tools */}
      <div className="hidden lg:flex items-center gap-3">
        <LocaleTool />
        <ThemeTool />
      </div>

      {/* Mobile & Tablet: Hamburger menu */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="text-cyan-50 border-cyan-50 hover:bg-cyan-800" aria-label="Open menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col gap-4 mt-8">
              <div className="space-y-4">
                <div className="pb-2 border-b">
                  <p className="text-sm font-semibold text-muted-foreground">Settings</p>
                </div>
                <LocaleTool />
                <ThemeTool />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
