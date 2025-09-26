'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Home, Settings, Users, FileText, BarChart3 } from 'lucide-react'
import { OpeningHours } from './opening-hours'
import { getCarsCount, getCarsTotalPrice } from '@/lib/actions/car.actions'

type ActiveSection = 'overview' | 'opening-hours' | 'settings' | 'users' | 'content' | 'analytics'

export const WebsiteAdmin = () => {
  const t = useTranslations('MyWebsite')
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')
  const [carsCount, setCarsCount] = useState<number | null>(null)
  const [carsTotalPrice, setCarsTotalPrice] = useState<number | null>(null)

  useEffect(() => {
    // fetch both count + total price on mount
    Promise.all([getCarsCount(), getCarsTotalPrice()])
      .then(([count, totalPrice]) => {
        setCarsCount(count)
        setCarsTotalPrice(totalPrice)
      })
      .catch(() => {
        setCarsCount(0)
        setCarsTotalPrice(0)
      })
  }, [])

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

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Website Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Website Status</CardTitle>
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Live</div>
                    <p className="text-sm text-muted-foreground">
                      <a className="cursor-pointer hover:underline" href="http://localhost:3000/website" target="_blank" rel="noopener noreferrer">
                        {t('openWebsite')}
                      </a>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cars Listed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{carsCount !== null ? carsCount : '...'}</div>
                    <p className="text-sm text-muted-foreground mb-4">Total cars currently available on the website</p>
                    <div className="text-l font-bold text-purple-600">{carsTotalPrice !== null ? `${carsTotalPrice.toLocaleString()} €` : '...'}</div>
                    <p className="text-xs text-muted-foreground">Total value of all cars</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" onClick={() => setActiveSection('opening-hours')} className="w-full justify-start">
                        <Clock className="mr-2 h-4 w-4" />
                        Update Hours
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setActiveSection('content')} className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Edit Content
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'opening-hours':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Opening Hours Management</h2>
            <OpeningHours />
          </div>
        )

      case 'content':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Content Management</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Content management features coming soon...</p>
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
                <p className="text-muted-foreground">User management features coming soon...</p>
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
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
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
                <p className="text-muted-foreground">Settings panel coming soon...</p>
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
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r rounded-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Website Admin</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your website</p>
          </div>

          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
