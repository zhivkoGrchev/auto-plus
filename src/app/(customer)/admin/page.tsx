import { Tabs } from 'radix-ui'
import { AddCarDialog, CarsList } from '@/components/features/cars-list'
import { useTranslations } from 'next-intl'
import { Profile } from '@/components/features/profile'

export default function AdminPage() {
  const t = useTranslations('Dashboard')

  return (
    <Tabs.Root className="flex flex-col grow p-4" defaultValue="cars-list">
      <Tabs.List className="flex justify-center gap-4">
        <Tabs.Trigger
          className="cursor-pointer p-2 border-b-2 data-[state=active]:border-cyan-400 dark:data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-950 dark:data-[state=active]:text-cyan-50 text-neutral-700 dark:text-neutral-200"
          value="cars-list"
        >
          {t('myCars')}
        </Tabs.Trigger>
        <Tabs.Trigger
          className="cursor-pointer p-2 border-b-2 data-[state=active]:border-cyan-400 dark:data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-950 dark:data-[state=active]:text-cyan-50 text-neutral-700 dark:text-neutral-200"
          value="profile"
        >
          {t('myProfile')}
        </Tabs.Trigger>
        <Tabs.Trigger
          className="cursor-pointer p-2 border-b-2 data-[state=active]:border-cyan-400 dark:data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-950 dark:data-[state=active]:text-cyan-50 text-neutral-700 dark:text-neutral-200"
          value="website"
        >
          {t('myWebsite')}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="flex flex-col py-4 gap-4 grow" value="cars-list">
        <div className="flex justify-end">
          <AddCarDialog />
        </div>
        <CarsList />
      </Tabs.Content>
      <Tabs.Content className="flex flex-col py-4 gap-4 grow" value="profile">
        <Profile />
      </Tabs.Content>
      <Tabs.Content className="flex flex-col p-2 gap-4 grow" value="website">
        <div className="mt-10">
          <p className="text-center text-lg font-semibold mb-4">
            <a className="cursor-pointer" href="http://localhost:3000/website" target="_blank" rel="noopener noreferrer">
              Open my Website
            </a>
          </p>
          <p className="text-center">This feature is under development.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
