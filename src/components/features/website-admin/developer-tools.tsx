'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FileText, ExternalLink, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface DeveloperToolsProps {
  profileSlug: string | null
}

export function DeveloperTools({ profileSlug }: DeveloperToolsProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const t = useTranslations('AdminPage')

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
        <h2 className="text-2xl font-bold">{t('developerTools')}</h2>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">{t('devToolsDescription')}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('developerTools')}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t('devToolsDescription1')}</p>
      </div>

      {/* Embed Code Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('embedCodeLabel')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">{t('embedCodeDescription')}</p>

          {/* Light Theme */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">{t('embedCodeLight')}</Label>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-xs border">{lightThemeCode}</pre>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => copyToClipboard(lightThemeCode, 'Light')}>
              <Copy className="h-4 w-4 mr-2" />
              {t('embedCodeLightButton')}
            </Button>
          </div>

          {/* Dark Theme */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">{t('embedCodeDark')}</Label>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-xs border">{darkThemeCode}</pre>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => copyToClipboard(darkThemeCode, 'Dark')}>
              <Copy className="h-4 w-4 mr-2" />
              {t('embedCodeDarkButton')}
            </Button>
          </div>

          {/* Preview Link */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold mb-2 block">{t('preview')}</Label>
            <div className="flex gap-2">
              <Button variant="default" size="sm" asChild>
                <a href={`/embed/${profileSlug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('previewLightTheme')}
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`/embed/${profileSlug}?theme=dark`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('previewDarkTheme')}
                </a>
              </Button>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-semibold mb-2 block">{t('howToUse')}</Label>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>{t('usageInstructions.step1')}</li>
              <li>{t('usageInstructions.step2')}</li>
              <li>{t('usageInstructions.step3')}</li>
              <li>{t('usageInstructions.step4')}</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
