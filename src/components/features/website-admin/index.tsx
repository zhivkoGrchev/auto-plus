'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Clock, Home, Settings, Users, FileText, BarChart3, Menu, X, RefreshCw, ExternalLink, AlertCircle, TrendingUp, DollarSign, Car } from 'lucide-react'
import { OpeningHours } from './opening-hours'
import { getCarsCount, getCarsTotalPrice } from '@/lib/actions/car.actions'

type ActiveSection = 'overview' | 'opening-hours' | 'settings' | 'users' | 'content' | 'analytics'

interface CarStats {
  carsCount: number | null
  totalValue: number | null
  avgPrice: number | null
}

interface WebsiteAdminProps {
  profileSlug: string | null
}

export const WebsiteAdmin = ({ profileSlug }: WebsiteAdminProps) => {
  const t = useTranslations('MyWebsite')
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<CarStats>({
    carsCount: null,
    totalValue: null,
    avgPrice: null,
  })

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [count, totalPrice] = await Promise.all([getCarsCount(), getCarsTotalPrice()])

      const avgPrice = count && count > 0 ? totalPrice / count : 0

      setStats({
        carsCount: count,
        totalValue: totalPrice,
        avgPrice: Math.round(avgPrice),
      })
    } catch (err) {
      console.error('Failed to fetch car stats:', err)
      setError('Failed to load statistics. Please try again.')
      setStats({
        carsCount: 0,
        totalValue: 0,
        avgPrice: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const navigationItems = [
    {
      id: 'overview' as const,
      label: 'Overview',
      icon: Home,
    },
    {
      id: 'opening-hours' as const,
      label: 'Opening Hours',
      icon: Clock,
    },
    {
      id: 'content' as const,
      label: 'Content',
      icon: FileText,
    },
    {
      id: 'users' as const,
      label: 'Users',
      icon: Users,
    },
    {
      id: 'analytics' as const,
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      icon: Settings,
    },
  ]

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    colorClass,
    footer,
  }: {
    title: string
    value: string | number
    description: string
    icon: any
    colorClass: string
    footer?: React.ReactNode
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          </div>
        ) : (
          <>
            <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            {footer && <div className="mt-3">{footer}</div>}
          </>
        )}
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">Website Overview</h2>
              <div className="flex items-center gap-2">
                <Button variant="default" size="sm" asChild disabled={!profileSlug}>
                  <a
                    href={profileSlug ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${profileSlug}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Website
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Website Status"
                value="Live"
                description="Your website is currently online and accessible"
                icon={Home}
                colorClass="text-green-600"
              />

              <StatCard
                title="Cars Listed"
                value={stats.carsCount ?? 0}
                description="Total cars available on the website"
                icon={Car}
                colorClass="text-purple-600"
              />

              <StatCard
                title="Total Inventory Value"
                value={stats.totalValue !== null ? `€${stats.totalValue.toLocaleString()}` : '€0'}
                description="Combined value of all listed cars"
                icon={DollarSign}
                colorClass="text-blue-600"
              />

              <StatCard
                title="Average Car Price"
                value={stats.avgPrice !== null ? `€${stats.avgPrice.toLocaleString()}` : '€0'}
                description="Average price across all inventory"
                icon={TrendingUp}
                colorClass="text-orange-600"
              />

              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveSection('opening-hours')
                        setIsMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Update Hours
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveSection('content')
                        setIsMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Edit Content
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveSection('analytics')
                        setIsMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveSection('settings')
                        setIsMobileMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'opening-hours':
        return (
          <div>
            <OpeningHours profileSlug={profileSlug} />
          </div>
        )

      case 'content':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Content Management</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Content Management</h3>
                  <p className="text-muted-foreground">Content management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'users':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">User management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'analytics':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Website Analytics</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Website Settings</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
                  <p className="text-muted-foreground">Settings panel coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button variant="outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-full justify-start">
            {isMobileMenuOpen ? <X className="h-5 w-5 mr-2" /> : <Menu className="h-5 w-5 mr-2" />}
            {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          </Button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 bg-white dark:bg-gray-800 shadow-sm border rounded-lg
          `}
        >
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Website Admin</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your website</p>
          </div>

          <nav className="mt-6 px-3 pb-6" aria-label="Website admin navigation">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
