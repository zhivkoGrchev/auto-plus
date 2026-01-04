import { getProfile } from '@/lib/actions/profile.actions'
import { WebsiteAdmin } from '@/components/features/website-admin'

export default async function WebsitePage() {
  const { data: profile, error } = await getProfile()
  const slug = !error ? profile.slug : null
  return <WebsiteAdmin profileSlug={slug} />
}
