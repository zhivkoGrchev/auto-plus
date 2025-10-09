'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FileText, ExternalLink, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface DeveloperToolsProps {
  profileSlug: string | null
}

export function DeveloperTools({ profileSlug }: DeveloperToolsProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const copyToClipboard = (code: string, theme: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`${theme} theme code copied to clipboard!`)
  }

  const lightThemeCode = `<iframe 
  src="${appUrl}/embed/${profileSlug}"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none;"
  title="Car Inventory"
></iframe>`

  const darkThemeCode = `<iframe 
  src="${appUrl}/embed/${profileSlug}?theme=dark"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none;"
  title="Car Inventory"
></iframe>`

  if (!profileSlug) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Developer Tools</h2>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Please create a profile first to access embed codes.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Developer Tools</h2>
        <p className="text-sm text-muted-foreground mt-1">Embed your car inventory on external websites</p>
      </div>

      {/* Embed Code Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Embed Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Copy this code to embed your car inventory on any external website. The widget is read-only and updates automatically when you add or remove cars.
          </p>

          {/* Light Theme */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">Light Theme:</Label>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-xs border">{lightThemeCode}</pre>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => copyToClipboard(lightThemeCode, 'Light')}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Light Theme Code
            </Button>
          </div>

          {/* Dark Theme */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">Dark Theme:</Label>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-xs border">{darkThemeCode}</pre>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => copyToClipboard(darkThemeCode, 'Dark')}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Dark Theme Code
            </Button>
          </div>

          {/* Preview Link */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold mb-2 block">Preview:</Label>
            <div className="flex gap-2">
              <Button variant="default" size="sm" asChild>
                <a href={`/embed/${profileSlug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Light Theme
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`/embed/${profileSlug}?theme=dark`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Dark Theme
                </a>
              </Button>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold mb-2 block">How to use:</Label>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Copy the embed code above (choose light or dark theme)</li>
              <li>Paste the code into your website's HTML where you want the car inventory to appear</li>
              <li>The widget will automatically display all cars marked as "List on Website"</li>
              <li>Changes you make in the admin panel will reflect immediately in the embed</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
