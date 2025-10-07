import { Tabs } from 'radix-ui'
import { useTranslations } from 'next-intl'
import { CarsList } from '@/components/features/cars-list'
import { ProfilesList } from '@/components/features/profiles-list'
import { WebsiteAdmin } from '@/components/features/website-admin'

export default function AdminPage() {
  const t = useTranslations('AdminPage')

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
          value="profiles-list"
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
        <CarsList />
      </Tabs.Content>
      <Tabs.Content className="flex flex-col py-4 gap-4 grow" value="profiles-list">
        <ProfilesList />
      </Tabs.Content>
      <Tabs.Content className="flex flex-col p-2 gap-4 grow" value="website">
        <WebsiteAdmin />
      </Tabs.Content>
    </Tabs.Root>
  )
}
