'use client'
import { Tabs } from 'radix-ui'
import { AddCarDialog, CarsList } from '@/components/features/cars-list'
import { useTranslations } from 'next-intl'

export default function Dashboard() {
  const t = useTranslations('Dashboard')

  return (
    <Tabs.Root className="flex flex-col grow p-4" defaultValue="cars-list">
      <Tabs.List className="flex justify-center gap-4">
        <Tabs.Trigger className="p-2 border-b-2 border-cyan-800 dark:border-cyan-500" value="cars-list">
          {t('myCars')}
        </Tabs.Trigger>
        <Tabs.Trigger className="p-2 border-b-2 border-cyan-800 dark:border-cyan-500" value="profile">
          {t('myParks')}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="flex flex-col p-2 gap-4 grow" value="cars-list">
        <div className="flex justify-end">
          <AddCarDialog />
        </div>
        <CarsList />
      </Tabs.Content>
      <Tabs.Content className="flex flex-col p-2 gap-4 grow" value="profile">
        <p>Profile goes Here!!!</p>
      </Tabs.Content>
    </Tabs.Root>
  )
}
