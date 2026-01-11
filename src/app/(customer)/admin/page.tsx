import { redirect } from 'next/navigation'
import { WebsiteAdmin } from '@/components/features/website-admin'
import { getProfile } from '@/lib/actions/profile.actions'

export default async function AdminPage() {
  const { data: profile, error } = await getProfile()
  if (error) redirect('/admin/profiles')
  return <WebsiteAdmin profileSlug={profile.slug} />
}
